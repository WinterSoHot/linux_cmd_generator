import { useState, useMemo } from 'react';
import './App.css';
import { commandsConfig } from './commands';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formValues, setFormValues] = useState({});
  const [copied, setCopied] = useState(false);

  // 构建命令索引用于搜索
  const commandIndex = useMemo(() => {
    const index = [];
    Object.entries(commandsConfig).forEach(([catKey, catConfig]) => {
      catConfig.params.forEach(param => {
        if (param.type === 'select' && param.name === 'action') {
          param.options.forEach(opt => {
            index.push({
              command: opt.value,
              label: opt.label,
              category: catKey,
              categoryName: catConfig.name,
              categoryIcon: catConfig.icon
            });
          });
        }
      });
    });
    return index;
  }, []);

  // 搜索过滤
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1) return [];

    return commandIndex.filter(item => {
      const query = searchQuery.toLowerCase();
      return item.command.includes(query) ||
             item.label.toLowerCase().includes(query) ||
             item.categoryName.toLowerCase().includes(query);
    });
  }, [searchQuery, commandIndex]);

  // 生成命令
  const generateCommand = () => {
    const action = formValues.action;
    if (!action || !selectedCategory) return '';

    const category = commandsConfig[selectedCategory];
    let parts = [action];

    // 添加标志
    if (formValues.flags) {
      formValues.flags.forEach(flag => parts.push(flag));
    }

    // 根据命令类型添加参数
    switch (selectedCategory) {
      case 'file':
        if (formValues.path) parts.push(formValues.path);
        if (formValues.dest) parts.push(formValues.dest);
        if (formValues.chmod_mode && action === 'chmod') {
          const chmodIndex = parts.indexOf('chmod');
          if (chmodIndex !== -1) parts.splice(chmodIndex + 1, 0, formValues.chmod_mode);
        }
        if (formValues.owner && action === 'chown') {
          parts.push(formValues.owner);
          if (formValues.path) parts.push(formValues.path);
        }
        break;

      case 'network':
        if (action === 'ping') {
          if (formValues.count) parts.push('-c', formValues.count);
          if (formValues.host) parts.push(formValues.host);
        } else if (action === 'ssh') {
          if (formValues.port) parts.push('-p', formValues.port);
          if (formValues.user) parts.push(`${formValues.user}@${formValues.host}`);
          else if (formValues.host) parts.push(formValues.host);
        } else if (action === 'scp') {
          let spec = '';
          if (formValues.user) spec += `${formValues.user}@`;
          if (formValues.host) spec += formValues.host;
          if (formValues.remote_path) spec += `:${formValues.remote_path}`;
          if (formValues.local_path) {
            parts.push(formValues.local_path, spec);
          } else if (spec) {
            parts.push(spec);
          }
        } else if (['curl', 'wget'].includes(action)) {
          if (formValues.host) parts.push(formValues.host);
          if (formValues.local_path) {
            if (action === 'wget') parts.push('-O', formValues.local_path);
            else if (action === 'curl') parts.push('-o', formValues.local_path);
          }
        } else {
          if (formValues.host) parts.push(formValues.host);
        }
        break;

      case 'process':
        if (formValues.pid) parts.push(formValues.pid);
        if (formValues.process_name) parts.push(formValues.process_name);
        if (formValues.signal && ['kill', 'pkill'].includes(action)) {
          parts.push(formValues.signal);
        }
        break;

      case 'system':
        if (formValues.path && ['du', 'df'].includes(action)) {
          parts.push(formValues.path);
        }
        break;

      case 'search':
        if (action === 'find') {
          if (formValues.path) parts.push(formValues.path);
          if (formValues.flags?.includes('-name') && formValues.filename) {
            parts.push('-name', `"${formValues.filename}"`);
          }
          if (formValues.pattern) parts.push('-name', `"${formValues.pattern}"`);
        } else if (action === 'grep') {
          if (formValues.pattern) parts.push(`"${formValues.pattern}"`);
          if (formValues.path) parts.push(formValues.path);
        } else {
          if (formValues.pattern || formValues.filename) {
            parts.push(formValues.pattern || formValues.filename);
          }
        }
        break;

      case 'compress':
        if (action === 'tar') {
          let tarFlags = formValues.mode ? [formValues.mode] : [];
          if (formValues.flags) {
            formValues.flags.forEach(f => {
              if (['-z', '-j', '-J', '-v', '-f'].includes(f)) tarFlags.push(f);
            });
          }
          if (!tarFlags.includes('-f')) tarFlags.push('-f');
          const combinedFlags = '-' + tarFlags.filter(f => f.startsWith('-')).map(f => f.slice(1)).join('');
          parts = ['tar', combinedFlags];
          if (formValues.archive) parts.push(formValues.archive);
          if (formValues.files) parts.push(formValues.files);
          if (formValues.dest && formValues.mode === '-x') {
            parts.push('-C', formValues.dest);
          }
        } else if (action === 'zip') {
          if (formValues.archive) parts.push(formValues.archive);
          if (formValues.files) parts.push(formValues.files);
        } else if (action === 'unzip') {
          if (formValues.archive) parts.push(formValues.archive);
          if (formValues.dest) parts.push('-d', formValues.dest);
        } else {
          if (formValues.files) parts.push(formValues.files);
        }
        break;

      case 'user':
        if (formValues.username) parts.push(formValues.username);
        if (formValues.group && action === 'useradd') parts.push('-g', formValues.group);
        if (formValues.shell && action === 'useradd') parts.push('-s', formValues.shell);
        if (formValues.home && action === 'useradd') parts.push('-d', formValues.home);
        break;

      case 'package':
        let pkgCmd = `${formValues.manager} ${formValues.action}`;
        parts = [pkgCmd];
        if (formValues.package) parts.push(formValues.package);
        break;

      case 'log':
        if (formValues.lines && !formValues.flags?.includes('-n')) {
          parts.push('-n', formValues.lines);
        }
        if (formValues.logfile) parts.push(formValues.logfile);
        break;

      case 'disk':
        if (action === 'mount') {
          if (formValues.fstype) parts.push('-t', formValues.fstype);
          if (formValues.device) parts.push(formValues.device);
          if (formValues.mountpoint) parts.push(formValues.mountpoint);
        } else if (action === 'dd') {
          if (formValues.device) parts.push(`if=${formValues.device}`);
          if (formValues.dest) parts.push(`of=${formValues.dest}`);
        } else if (action === 'rsync') {
          if (formValues.device) parts.push(formValues.device);
          if (formValues.dest) parts.push(formValues.dest);
        } else {
          if (formValues.device) parts.push(formValues.device);
        }
        break;

      default:
        break;
    }

    return parts.filter(p => p && p !== '').join(' ');
  };

  const currentCommand = generateCommand();

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setFormValues({});
  };

  const handleCommandSelect = (categoryKey, commandValue) => {
    setSelectedCategory(categoryKey);
    setFormValues({ action: commandValue });
    setSearchQuery('');
  };

  const handleParamChange = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleFlagToggle = (flag, checked) => {
    setFormValues(prev => {
      const flags = prev.flags || [];
      if (checked) {
        return { ...prev, flags: [...flags, flag] };
      } else {
        return { ...prev, flags: flags.filter(f => f !== flag) };
      }
    });
  };

  const copyToClipboard = async () => {
    if (!currentCommand) return;

    try {
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = currentCommand;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 检查参数是否应该显示
  const shouldShowParam = (param) => {
    if (!param.condition) return true;

    if (typeof param.condition === 'string') {
      return formValues.action === param.condition;
    }
    if (Array.isArray(param.condition)) {
      return param.condition.includes(formValues.action);
    }
    if (typeof param.condition === 'function') {
      return true;
    }
    return true;
  };

  // 获取动态选项
  const getDynamicOptions = (param) => {
    if (typeof param.condition === 'function') {
      const result = param.condition(formValues);
      if (result && Array.isArray(result)) {
        return result.map(opt => typeof opt === 'string' ? { value: opt, label: opt } : opt);
      }
    }
    return param.options;
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🐧 Linux 命令生成器</h1>

        {/* 搜索框 */}
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 搜索命令... (例如：ls, grep, ssh)"
          />

          {searchQuery.length > 0 && (
            <div className={`search-results ${searchResults.length > 0 ? 'show' : ''}`}>
              {searchResults.length === 0 ? (
                <div className="no-results">未找到匹配的命令</div>
              ) : (
                searchResults.map((item, index) => (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => handleCommandSelect(item.category, item.command)}
                  >
                    <div>
                      <span className="search-result-command">{item.command}</span>
                      <span className="search-result-label">{item.label}</span>
                    </div>
                    <span className="search-result-category">
                      {item.categoryIcon} {item.categoryName}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* 命令类别选择 */}
        <div className="card">
          <div className="card-title">📋 选择命令类别</div>
          <div className="command-grid">
            {Object.entries(commandsConfig).map(([key, config]) => (
              <button
                key={key}
                className={`command-btn ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => handleCategorySelect(key)}
              >
                {config.icon} {config.name}
              </button>
            ))}
          </div>
        </div>

        {/* 参数配置 */}
        {selectedCategory && (
          <div className="card params-container show">
            <div className="card-title">⚙️ 参数配置</div>
            <div className="params-form">
              {commandsConfig[selectedCategory].params
                .filter(param => shouldShowParam(param))
                .map((param, index) => {
                  const options = param.type === 'select' ? getDynamicOptions(param) : [];

                  return (
                    <div key={index} className="form-group">
                      <label>{param.label}</label>

                      {param.type === 'select' && (
                        <select
                          value={formValues[param.name] || ''}
                          onChange={(e) => handleParamChange(param.name, e.target.value)}
                        >
                          <option value="">请选择</option>
                          {options.map((opt, i) => (
                            <option key={i} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}

                      {param.type === 'input' && (
                        <input
                          type="text"
                          value={formValues[param.name] || ''}
                          onChange={(e) => handleParamChange(param.name, e.target.value)}
                          placeholder={param.placeholder || ''}
                        />
                      )}

                      {param.type === 'checkbox' && options && (
                        <div className="checkbox-group">
                          {options.map((opt, i) => (
                            <label key={i} className="checkbox-item">
                              <input
                                type="checkbox"
                                checked={(formValues.flags || []).includes(opt.value)}
                                onChange={(e) => handleFlagToggle(opt.value, e.target.checked)}
                              />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 输出区域 */}
        <div className="card">
          <div className="card-title">💻 生成的命令</div>
          <div className="output-section">
            <div className="command-output">
              {currentCommand || '请先选择命令类型...'}
            </div>
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
              disabled={!currentCommand}
            >
              {copied ? '✅ 已复制' : '📋 复制命令'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

export NODE_ENV=development

# NPM_PACKAGES="${HOME}app-root/data/.npm-packages"
#PATH="$NPM_PACKAGES/bin:$PATH"
#unset MANPATH # delete if you already modified MANPATH elsewhere in your config
#export MANPATH="$NPM_PACKAGES/share/man:$(manpath)"

export XDG_DATA_HOME="${HOME}app-root/data/.local/share"
export XDG_CONFIG_HOME="${HOME}app-root/data/.config"
export XDG_CACHE_HOME="${HOME}app-root/data/.cache"

# export XDG_DATA_DIRS || '/usr/local/share/:/usr/share/').split(':');
# exports.configDirs = (env.XDG_CONFIG_DIRS || '/etc/xdg').split(':');"

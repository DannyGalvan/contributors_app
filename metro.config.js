const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function envCacheKey() {
  const hash = crypto.createHash('md5');
  for (const file of ['.env.debug', '.env.release']) {
    try {
      hash.update(fs.readFileSync(path.join(__dirname, file)));
    } catch {}
  }
  return hash.digest('hex');
}

const config = {
  cacheVersion: envCacheKey(),
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

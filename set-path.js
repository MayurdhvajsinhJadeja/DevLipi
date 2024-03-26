const { execSync } = require('child_process');

try {
  execSync(`$env:PATH += ";${__dirname}"`, { stdio: 'inherit', shell: 'powershell' });
  console.log('PATH variable updated successfully.');
} catch (error) {
  console.error('Error updating PATH variable:', error);
}

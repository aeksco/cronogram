export const API_ROOT = '/api/tasks'

export const NEW_TASK = {
  'label': 'My New Task',
  'dependencies': [],
  'cron': '*/30 * * * *',
  'description': '',
  'script': `module.exports = async function(cronogram) {
  const message = 'Hello, world!'
  return cronogram.done({ text: message });
}`
}

const path = require('path')
const createHandler = require('github-webhook-handler')

let handler = createHandler({path: process.env.GLITCH_WEBHOOK_PAHT || '/glitch-webhook', secret: process.env.WEBHOOK_SECRET })

handler.on('push', async (event) => {
  // Clone and untar at /tmp/sha
  if (!event.payload.ref === 'refs/heads/master') {
    // Only care about master pushes
    console.log('The ref didn\'t match master: ', event.payload.ref)
    return;
  }

  exec('git fetch --all && git reset --hard origin/master && refresh', (error, stdout, stderr) => {
    if (error) {
      console.log('Error updating repo: ', error)
    }
    console.log('Success: ', stdout)
  })
})

module.exports = handler

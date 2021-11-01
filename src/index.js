import schedule from 'node-schedule'
import startOralce from './oracle'

const job = schedule.scheduleJob('23 8 1 * *', function() {
  console.log('Running Oracle...');
  startOralce()
});
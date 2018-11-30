import moment from 'moment'
export default function (time) {
  let block_time = new Date().getTime() - new Date(time).getTime()
  let days = Math.floor(block_time / 1000 / 60 / 60 / 24)
  let hours = Math.floor(block_time / 1000 / 60 / 60 % 24)
  let minutes = Math.floor(block_time / 1000 / 60 % 60)
  let seconds = Math.floor(block_time / 1000 % 60)
  let times = {
    days,
    hours,
    minutes,
    seconds,
    times: moment(time).format('MMM DD YYYY HH:MM:SS A Z')
  }
  return times
}

import dayjs from 'dayjs';

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}


export const imgBase64 = (url: string) => {
  const base64 = wx.getFileSystemManager().readFileSync(url, "base64");
  const base64Url = `data:image/png;base64,${base64}`;
  return base64Url;
};

export const toDay = () => {
  const currentDateTime = dayjs();
  const year = currentDateTime.year();
  const month = (currentDateTime.month() + 1).toString().padStart(2, '0');
  // 月份是从 0 开始计数的，因此需要加 1
  const day = currentDateTime.date().toString().padStart(2, '0');
  const hours = currentDateTime.hour().toString().padStart(2, '0');
  const minutes = currentDateTime.minute().toString().padStart(2, '0');
  const seconds = currentDateTime.second().toString().padStart(2, '0');

  const date = `${year}/${month}/${day}`;
  const time = `${hours}:${minutes}:${seconds}`

  return { date, time };
}

export const isToday = (dateStr: string) => {
  return toDay().date === dateStr;
}
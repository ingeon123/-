export const generateCalendar = (data) => {
  
  const monthContainer = document.querySelector("#month")
  const daysContainer = document.querySelector("#days")
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  function truncateText(text) {
    const maxLength = 12;
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  monthContainer.textContent = monthNames[month];

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function renderCalendar() {
    daysContainer.innerHTML = '';
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(month, year);

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDayElement = document.createElement('div');
      emptyDayElement.classList.add('day');
      daysContainer.appendChild(emptyDayElement);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = day;
      daysContainer.appendChild(dayElement);

      // 테스트용 예외처리
      // 실사용시 다른 로직 추가
      if(!data[day-1]) {
        continue;
      }
      else{
        const noticeDiv = document.createElement("div")
        noticeDiv.classList.add('notice')
        const noticeDivDate = truncateText(data[day-1].title)
        noticeDiv.textContent = noticeDivDate
        dayElement.appendChild(noticeDiv)
      }
    }
    const remainingDays = 7 - (daysContainer.childElementCount % 7);
        if (remainingDays < 7) {
            for (let i = 0; i < remainingDays; i++) {
                const emptyDayElement = document.createElement('div');
                emptyDayElement.classList.add('day');
                daysContainer.appendChild(emptyDayElement);
            }
        }
  }
  renderCalendar();
}

$(".item").on("click", function() {
  let temp = document.getElementsByClassName("current-item");
  if (temp.length > 0) {
    temp[0].classList.remove('current-item');
  }
  $(this).addClass('current-item');
  const location = 'chat-logs/'.concat($(this).html(), '.htm');
  $('#chat-log').load(location);
  return false;
});

let history;

const handleUnauthorized = (error, cb) => {
  if (error.response.status == 401 && history) {
    alert('Bạn không có quyền thực hiện tác vụ này  ')
    history.push('/');
    return;
  }
  cb(error);
}

const setHistory = (h) => {
  history = h;
}

module.exports = {
  handleUnauthorized,
  setHistory
}
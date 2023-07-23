import instance from "./instance";
// ok
export const authGoogleLogin = (token) => {
  return instance.request({
    method: "POST",
    url: "/login/",
    data: { id_token: token },
  });
};

export const getRefreshtoken = (token) => {
  return instance.request({
    method: "POST",
    url: "'/token/refresh/",
    data: { refresh: token },
  });
} 
// ok
export const createPoll = (pollInfo) => {
  return instance.request({
    method: "POST",
    url: "/vote/create/",
    data: pollInfo
  })
}
// ok
export const getAllPoll = () => {
  return instance.request({
    method: "GET",
    url: "/pollInfo/"
  })
}
// ok
export const updatePollVote  = (id, option) => {
  return instance.request({
    method : "PUT",
    url: `/poll/edit/${id}`,
    data: {new_option: option},
  })
}

// ok
export const fetchDetailPoll = (id) => {
  return instance.request({
    method: "GET",
    url: `/poll/detail/${id}`
  })
}
// ok
export const fetchPollStatistic = (id) => {
  return instance.request({
    method: "GET",
    url: `/poll/statistic/1/${id}`
  })
}
// ok
export const getMyPoll = () => {
  return instance.get('/poll/list');
}
// ok
export const deletePoll = (id) => {
  return instance.delete(`/poll/delete/${id}`);
}

export const createVote = (vote) => {
  return instance.request({
    method : "PUT",
    url: '/vote/',
    data: vote
  })
}
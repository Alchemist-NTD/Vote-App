import instance from "./instance";

export const authGoogleLogin = (token) => {
  return instance.request({
    method: "POST",
    url: "/login/",
    data: { id_token: token },
  });
};

export const fetchUser = () => {
  return instance.get('/userInfo/')
}
export const getRefreshtoken = (token) => {
  return instance.request({
    method: "POST",
    url: "'/token/refresh/",
    data: { refresh: token },
  });
} 

export const createPoll = (pollInfo) => {
  return instance.request({
    method: "POST",
    url: "/vote/create/",
    data: pollInfo
  })
}

export const getAllPoll = () => {
  return instance.request({
    method: "GET",
    url: "/pollInfo/"
  })
}

export const updatePollVote  = (id, option) => {
  return instance.request({
    method : "PUT",
    url: `/poll/edit/${id}`,
    data: {new_option: option},
  })
}


export const fetchDetailPoll = (id) => {
  return instance.request({
    method: "GET",
    url: `/poll/detail/${id}`
  })
}

export const getMyPoll = () => {
  return instance.get('/poll/');
}
export const deletePoll = (id) => {
  return instance.delete(`/poll/${id}`);
}

export const createVote = (vote) => {
  return instance.request({
    method : "POST",
    url: '/vote/',
    data: vote
  })
}
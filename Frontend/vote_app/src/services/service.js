import instance from "./instance";

export const googleLogin = (token) => {
  return instance.request({
    method: "POST",
    url: "/login",
    data: { id_token: token },
  });
};

export const createPoll = (pollInfo) => {
  return instance.request({
    method: "POST",
    url: "/poll/create/",
    data: pollInfo
  })
}

export const getAllPoll = () => {
  return instance.request({
    method: "GET",
    url: "/pollInfo/"
  })
}

export const updatePollVote  = (id, select) => {
  return instance.request({
    method : "PUT",
    url: `/poll/edit/${id}`,
    data: select,
  })
}

export const fetchDetailPoll = (id) => {
  return instance.request({
    method: "GET",
    url: `/polldetail/${id}`
  })
}
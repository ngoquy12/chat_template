const friendService = require("../services/friend.service");

module.exports.listFriendRequest = async (req, res) => {
  const { id } = req.params;

  const result = await friendService.listFriendRequest(res, id);
  return result;
};

module.exports.deleteRequest = async (req, res) => {
  const { id } = req.params;

  const result = await friendService.deleteRequest(res, id);
  return result;
};

module.exports.sendFriendRequest = async (req, res) => {
  const { UserSendId, UserReceiverId } = req.body;
  console.log("UserSendId, UserReceiverId", UserSendId, UserReceiverId);

  const result = await friendService.sendFriendRequest(
    res,
    UserSendId,
    UserReceiverId
  );
  return result;
};

module.exports.listFriendSuggest = async (req, res) => {
  const { id } = req.params;

  const result = await friendService.listFriendSuggest(res, id);
  return result;
};

module.exports.getFrinded = async (req, res) => {
  const { id } = req.params;

  const result = await friendService.getFrinded(res, id);
  return result;
};

module.exports.updateStatusRequest = async (req, res) => {
  const { id } = req.params;

  const result = await friendService.updateStatusRequest(res, id);
  return result;
};

// Xác nhận cả 2 user đã là bạn bè
module.exports.addFriend = async (req, res) => {
  const { UserId1, UserId2 } = req.body;

  const result = await friendService.addFriend(res, UserId1, UserId2);
  return result;
};

// Xác nhận cả 2 user đã là bạn bè
module.exports.deleteRequestOld = async (req, res) => {
  const { id } = req.params;

  const result = await friendService.deleteRequestOld(res, id);
  return result;
};

// Danh sách những người đã là bạn bè
module.exports.listFriended = async (req, res) => {
  const { id } = req.params;

  const result = await friendService.listFriended(res, id);
  return result;
};

// Thêm bạn bè vào nhóm chát
module.exports.addFriendOnChat = async (req, res) => {
  const { UserIds, RoomId } = req.body;

  console.log("UserIds, RoomId", UserIds, RoomId);

  const result = await friendService.addFriendOnChat(res, UserIds, RoomId);
  return result;
};

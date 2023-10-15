import {
  BellOutlined,
  FileImageOutlined,
  SendOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import InputEmoji from "react-input-emoji";
import moment from "moment";
import instance from "../api/apiConfig";
import Add_User_Chat from "./modals/Add_User_Chat";

export default function List_Chat() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const inputRef = useRef(null);
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  const [listRoom, setListRoom] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef();
  const [roomIdGroup, setRoomIdGroup] = useState(null);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadListRoom = () => {
    instance
      .get(`rooms/list-room/${userLocal.UserId}`)
      .then((res) => setListRoom(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadListRoom();
  }, []);

  // Hiển thị modal thêm thành viên vào nhóm chát
  const handleShow = (id) => {
    setRoomId(id);
    setShowModalAdd(true);
  };

  // Ẩn modal thêm thành viên vào nhóm chát
  const handleClose = () => {
    setShowModalAdd(false);
  };

  const getMesssageByRoom = () => {
    instance
      .get(`chats/room/${roomIdGroup}`)
      .then((res) => setMessages(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMesssageByRoom();
  }, [roomIdGroup]);

  // Hàm định dạng thời gian dựa trên khoảng cách
  const formatTime = (timestamp) => {
    const now = moment();
    const messageTime = moment(timestamp);

    const diffInDays = now.diff(messageTime, "days");

    if (diffInDays === 0) {
      return `Hôm nay lúc ${messageTime.format("HH:mm")}`;
    } else if (diffInDays === 1) {
      return `Hôm qua lúc ${messageTime.format("HH:mm")}`;
    } else {
      return messageTime.format("DD/MM/YYYY [lúc] HH:mm");
    }
  };

  const handleSendMessage = (value) => {
    instance
      .post("chats", {
        RoomId: roomIdGroup,
        UserId: userLocal.UserId,
        Content: value,
      })
      .then((res) => {
        getMesssageByRoom();
      })
      .catch((err) => console.log(err));
  };

  // Lấy id của room
  const getRoom = (id, name) => {
    setRoomIdGroup(id);
    setRoomName(name);
  };

  return (
    <>
      {/* Modal add user on chat */}
      {showModalAdd && (
        <Add_User_Chat
          roomId={roomId}
          userId={userLocal.UserId}
          close={handleClose}
        />
      )}

      <div className="flex flex-col w-80 border">
        <div className="flex items-center justify-center flex-col h-20  gap-4 border-b p-3">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="relative"
            placeholder="Tìm kiếm theo tên"
            style={{
              width: 240,
            }}
          />
          {search !== "" && (
            <>
              <ul className="absolute max-h-[500px] overflow-auto bg-white w-[265px] top-14 z-10 h-full">
                {users.length > 0 ? (
                  <>
                    {users.map((user) => (
                      <li className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-[#E9F2FD] cursor-pointer">
                        <div className="flex items-center gap-2">
                          <img
                            className="h-12 w-12 rounded-full"
                            src="https://img4.thuthuatphanmem.vn/uploads/2020/08/02/hinh-anh-dai-dien-facebook-den-ngau_013712452.jpg"
                            alt="Ảnh đại diện"
                          />
                          {user.UserName}
                        </div>
                        <div>
                          <UserAddOutlined
                            onClick={() => handleAddFriend(user.UserId)}
                            className="hover:bg-green-200 p-2 rounded-full"
                            title="Kết bạn"
                          />
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    <li className="flex h-24 border items-center justify-center px-3 py-2  cursor-not-allowed">
                      Không tìm thấy kết quả
                    </li>
                  </>
                )}
              </ul>
            </>
          )}
        </div>
        <div>
          <ul className="flex flex-col max-h-screen overflow-auto">
            {listRoom.map((room) => (
              <li
                onClick={() => getRoom(room.RoomId, room.RoomName)}
                className=" cursor-pointer px-6 py-3 gap-4 hover:bg-[#f9fafb]"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{room.RoomName}</span>
                  <UsergroupAddOutlined
                    onClick={() => handleShow(room.RoomId)}
                    className="cursor-pointer hover:bg-slate-300 p-2 rounded-full"
                    title="Thêm thành viên"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {roomName !== "" ? (
        <>
          <div className="flex flex-col w-full overflow-y-auto">
            <div className="h-20  flex items-center justify-between px-4 py-2 border-b w-full">
              <div className="flex items-center gap-4">
                {/* <img
              className="h-14 w-14 rounded-full"
              src="https://img4.thuthuatphanmem.vn/uploads/2020/08/02/hinh-anh-dai-dien-facebook-den-ngau_013712452.jpg"
              alt=""
            /> */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{roomName}</span>
                  <p className="text-sm">11 thành viên tham gia</p>
                </div>
              </div>
              <div>
                <BellOutlined
                  onClick={() => setShowDialog(!showDialog)}
                  className="text-3xl absolute right-6 top-4 cursor-pointer hover:bg-[#E9F2FD] p-2 rounded-full"
                />
                <span className="bg-red-500 px-2 rounded-xl text-sm right-5 top-5 text-white z-10 absolute">
                  10
                </span>
                {showDialog && (
                  <ul className="bg-white absolute right-8 top-14 border rounded pt-2 w-[480px] max-h-[400px] overflow-y-auto">
                    <div className="sticky top-0 bg-white z-20 font-semibold px-5 text-xl mb-2">
                      Tất cả thông báo
                    </div>
                    <li className="py-2 px-2 cursor-pointer hover:bg-[#E9F2FD]">
                      <div className="flex gap-3">
                        <img
                          className="h-14 rounded-full"
                          src="https://tse4.mm.bing.net/th?id=OIP.0i9PRZGvJbv7kG7XoQUAWQHaHa&pid=Api&P=0&h=180"
                          alt=""
                        />
                        <div className="flex flex-col justify-center">
                          <div>Tin nhắn mới đến từ Quý</div>
                          <div className="text-sm">Chào em nha</div>
                        </div>
                      </div>
                    </li>
                    <li className="py-2 px-2 cursor-not-allowed">
                      <div className="flex gap-3 justify-center">
                        <h2>Không có thông báo mới</h2>
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div
              className="bg-slate-200 w-full h-auto flex-1 p-5 overflow-auto"
              style={{ maxHeight: "calc(100vh - 160px)" }}
            >
              {messages.map((mess) => (
                <>
                  {mess.UserId === userLocal.UserId ? (
                    <>
                      <div className="flex justify-end mb-2">
                        <div className="bg-white w-auto min-w-[200px] max-w-[30%] p-2 text-black rounded-md flex flex-col">
                          <span className="pb-2">{mess.Content}</span>
                          <div className="text-sm">
                            {formatTime(mess.CreatedDate)}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-start mb-2">
                        <div className="bg-white w-auto min-w-[200px] max-w-[30%] p-2 text-black rounded-md flex flex-col">
                          <span className="text-sm text-gray-400">
                            Khải Phạm
                          </span>
                          <span className="pb-2">{mess.Content}</span>
                          <span className="text-sm">
                            {formatTime(mess.CreatedDate)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="w-full px-3 bottom-0 py-3 bg-white">
              <div className="flex justify-between gap-4 items-center">
                <input type="file" hidden id="file" />
                <label htmlFor="file">
                  <FileImageOutlined className="text-2xl cursor-pointer text-gray-600" />
                </label>
                <InputEmoji
                  ref={inputRef}
                  className="w-full"
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  onEnter={handleSendMessage}
                  placeholder="Nhập nội dung tin nhắn"
                />
                {text ? (
                  <SendOutlined
                    className="cursor-pointer text-blue-600"
                    onClick={handleSendMessage}
                  />
                ) : (
                  <SendOutlined className="cursor-not-allowed text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

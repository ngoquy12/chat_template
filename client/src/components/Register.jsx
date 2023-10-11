import { Button, Input, Radio } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form className="bg-white p-7 rounded shadow-md w-96 border flex flex-col gap-2">
          <h3 className="font-bold text-2xl text-center my-3">
            Đăng ký tài khoản
          </h3>
          <div>
            <label htmlFor="name">Tên</label>
            <Input
              name="UserName"
              className="mt-1"
              id="name"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div className="mt-1">
            <label htmlFor="gender">Giới tính</label>
            <div>
              <Radio.Group>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
                <Radio value={2}>Khác</Radio>
              </Radio.Group>
            </div>
          </div>
          <div>
            <label htmlFor="date">Ngày sinh</label>
            <Input name="DateOfBirth" className="mt-1" id="date" type="date" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              name="Email"
              className="mt-1"
              id="email"
              placeholder="Nhập địa chỉ email"
            />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <Input
              name="Password"
              className="mt-1"
              id="password"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Địa chỉ</label>
            <textarea
              name="Address"
              id="address"
              rows="2"
              placeholder="Nhập địa chỉ"
              className="mt-1 border outline-none rounded p-2 placeholder:text-sm"
            ></textarea>
          </div>
          <div className="mt-2">
            <Button
              htmlType="submit"
              className="bg-blue-600 w-full"
              type="primary"
            >
              Đăng ký
            </Button>
          </div>
          <p className="text-center ">
            Bạn đã có tài khoản?{" "}
            <Link className="text-blue-600  " to="/login">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

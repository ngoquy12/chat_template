import { Button, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form className="bg-white h-[350px] p-7 rounded shadow-md w-96 border flex flex-col gap-3">
          <h3 className="font-bold text-2xl text-center my-3">Đăng nhập</h3>
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

          <div className="mt-2">
            <Button
              htmlType="submit"
              className="bg-blue-600 w-full"
              type="primary"
            >
              Đăng nhập
            </Button>
          </div>
          <p className="text-center ">
            Bạn đã có tài khoản?{" "}
            <Link className="text-blue-600  " to="/register">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

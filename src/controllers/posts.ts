import { Request, Response, NextFunction } from "express";
import axios, { Axios, AxiosResponse } from "axios";

interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  let result: AxiosResponse = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  let posts: [Post] = result.data;
  return res.status(200).json({
    message: posts,
  });
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  let id: String = req.params.id;
  let result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  let post: [Post] = result.data;
  return res.status(200).json({
    message: post,
  });
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  let id: String = req.params.id;
  let title: String = req.body.title ?? null;
  let body: String = req.body.body ?? null;

  let response: AxiosResponse = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      ...(title && { title }),
      ...(body && { body }),
    }
  );

  return res.status(200).json({
    message: response.data,
  });
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  let id: String = req.params.id;
  let response: AxiosResponse = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.status(200).json({
    message: "Post deleted successfully",
  });
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  let title: String = req.body.title;
  let body: String = req.body.body;
  let response: AxiosResponse = await axios.post(
    `https://jsonplaceholder.typicode.com/posts/`,
    {
      title,
      body,
    }
  );
  return res.status(200).json({
    message: response.data,
  });
};

export default { getPosts, getPost, updatePost, addPost, deletePost };

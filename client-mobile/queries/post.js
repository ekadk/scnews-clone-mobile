import { gql } from "@apollo/client";

export const GET_ALL_POST = gql`
  query GetAllPost {
    getAllPost {
      id
      title
      slug
      imgUrl
      content
      category {
        id
        name
      }
      author {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($postId: ID) {
    getPostById(postId: $postId) {
      id
      title
      slug
      imgUrl
      content
      category {
        id
        name
      }
      author {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_POST_AND_CATEGORIES = gql`
  query GetAllPostAndCategories {
    getAllPost {
      id
      title
      slug
      imgUrl
      content
      category {
        id
        name
      }
      author {
        id
        email
      }
      createdAt
      updatedAt
    }
    getAllCategories {
      id
      name
    }
  }
`;

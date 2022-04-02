import { gql } from "@apollo/client";

export const CategoryListQuery = gql`
  {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

export const ProductListQuery = (productTitle) => gql`
  {
    category(input: { title: "${productTitle}"}) {
      products {
        id
        name
        inStock
        prices {
          currency {
            symbol
          }
          amount
        }
        gallery
      }
    }
  }
`;

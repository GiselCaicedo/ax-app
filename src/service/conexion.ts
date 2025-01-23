import axios from "axios";

interface WalmartProduct {
  position: number;
  title: string;
  price: {
    rawPrice: string;
  };
  image: string;
  ratings: number;
  reviewsCount: number;
  shippingMessage: string;
}

interface ProcessedProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  shipping: string;
}

const API_URL = 'https://walmart-data.p.rapidapi.com/walmart-serp.php';

export const getPremios = async (): Promise<ProcessedProduct[]> => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                url: encodeURIComponent('https://www.walmart.com/search?q=coca+cola+products')
            },
            headers: {
                'x-rapidapi-host': 'walmart-data.p.rapidapi.com',
                'x-rapidapi-key': 'abc8f7fa31mshd254110616e41abp16345cjsn9a27dbccb4fc'
            }
        });

        return response.data.body.products.map((product: WalmartProduct) => ({
            id: product.position,
            title: product.title,
            price: Math.round(parseFloat(product.price.rawPrice) * 10),
            image: product.image,
            rating: product.ratings,
            reviews: product.reviewsCount,
            shipping: product.shippingMessage
        }));

    } catch (e) {
        console.error('Error fetching products:', e);
        return [];
    }
}
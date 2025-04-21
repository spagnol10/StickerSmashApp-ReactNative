export type Product = {
    id?: string;
    name: string;
    price: string;
    imageBase64: string; 
  };
  
  export const mockProducts: Product[] = [
    {
      id: "1",
      name: "Banana",
      price: "R$ 4,99",
      imageBase64: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/06/banana_fruta_getty.jpg?w=1200&h=1200&crop=1Ma",
    },
    {
      id: "2",
      name: "Tomate",
      price: "R$ 5,49",
      imageBase64: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
    },
    {
      id: "3",
      name: "Maçã",
      price: "R$ 6,25",
      imageBase64: "https://superprix.vteximg.com.br/arquivos/ids/175207/Maca-Argentina--1-unidade-aprox.-200g-.png?v=636294203590200000",
    },
    {
      id: "4",
      name: "Uva",
      price: "R$ 8,90",
      imageBase64: "https://cdn.awsli.com.br/496/496853/produto/37100363/my-project-1---2023-05-13t182519-771-moh6ce2zg7.png",
    },
    {
      id: "5",
      name: "Cenoura",
      price: "R$ 3,75",
      imageBase64: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCuyird4GPGaxa7AO9plyOLGi_NlwaLN5Uw&s",
    },
  ];
  
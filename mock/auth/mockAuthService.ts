type RegisterData = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  };
  
  type RegisterResponse = {
    success: boolean;
    message: string;
  };
  
  // Função simulando o cadastro
  export const mockRegister = async (
    data: RegisterData
  ): Promise<RegisterResponse> => {
    return new Promise((resolve, reject) => {
      // Simulando delay de API
      setTimeout(() => {
        // Validação simples fake
        if (data.email === "fail@example.com") {
          reject(new Error("This email is already in use."));
        } else {
          resolve({
            success: true,
            message: "Account created successfully!",
          });
        }
      }, 1500); // Delay de 1.5 segundos
    });
  };
  
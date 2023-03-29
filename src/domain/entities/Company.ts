export interface Company{
        _id?: string,
        image: string,
        cnpj: string,
        category: string,
        name: string,
        email: string,
        password: string,
        signature: string,
        address_cep: String,
        address_uf: String,
        address_cidade: String,
        address_logradouro: String,
        address_numero: String,
        address_complemento: String,
        key: string,
        paymentCredentials: string,
        createdAt?: Date;
        updatedAt?: Date;
};
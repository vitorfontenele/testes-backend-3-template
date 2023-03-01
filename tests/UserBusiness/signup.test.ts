import { UserBusiness } from "../../src/business/UserBusiness"
import { SignupInputDTO } from "../../src/dtos/userDTO"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("signup", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    
    test("cadastro bem-sucedido retorna token", async () => {
        const input: SignupInputDTO = {
            email: "example@email.com",
            name: "Example Mock",
            password: "bananinha"
        }

        const response = await userBusiness.signup(input)
        expect(response.token).toBe("token-mock-normal")
    })

    test("name precisa ser string", async () => {
        expect.assertions(1);

        const input = {
            email: "example@email.com",
            password: "bananinha" 
        } as any;

        try {
            await userBusiness.signup(input);
        } catch(error) {
            if (error instanceof Error){
                expect(error.message).toBe("'name' deve ser string");
            }
        }
    })

    test("email não pode se repetir", () => {

        const input: SignupInputDTO = {
            name: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha"
        }
        
        expect(async () => {
            await userBusiness.signup(input);
        }).rejects.toThrow("'email' já existe");
    })
})
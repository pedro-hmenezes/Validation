import { Cliente } from '../src/cliente';

describe('Cliente (RN01)', () => {
    describe('criar cliente', () => {
        it('deve criar um cliente com nome válido (3 caracteres)', () => {
            const cliente = new Cliente("João");
            expect(cliente.nome).toBe("João");
        });

        it('deve criar um cliente com nome válido (mais de 3 caracteres)', () => {
            const cliente = new Cliente("Maria");
            expect(cliente.nome).toBe("Maria");
        });

        it('deve lançar erro ao criar um cliente com nome vazio', () => {
            expect(() => new Cliente("")).toThrowError("O nome do cliente não pode ser vazio.");
        });
        
        it('deve lançar erro se o nome tiver apenas espaços em branco', () => {
            expect(() => new Cliente("   ")).toThrowError("O nome do cliente não pode ser vazio.");
        });

        it('deve lançar erro se o nome tiver menos de 3 caracteres', () => {
            expect(() => new Cliente("Jo")).toThrowError("O nome do cliente deve ter pelo menos 3 caracteres.");
        });

        it('deve aceitar nome com exatamente 3 caracteres (com espaços nas pontas)', () => {
            const cliente = new Cliente("  Ana  ");
            expect(cliente.nome).toBe("  Ana  ");
        }); //observacao: validação usa trim apenas para verificar o tamanho, mas não altera o valor armazenado.
    });
});
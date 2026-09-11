export class Cliente {
    private _nome: string;

    constructor(nome: string) {
        this.validarNome(nome);
        this._nome = nome;
    }

    private validarNome(nome: string): void {
        if (!nome || nome.trim().length === 0) {
            throw new Error("O nome do cliente não pode ser vazio.");
        }

        if (nome.trim().length < 3) {
            throw new Error("O nome do cliente deve ter pelo menos 3 caracteres.");
        }
    }

    get nome(): string {
        return this._nome;
    }
}
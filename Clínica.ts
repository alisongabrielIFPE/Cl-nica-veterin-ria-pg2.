abstract class Animal {
    protected nome: string;
    protected idade: number;
    protected tutorResponsavel: string;

    constructor(nome: string, idade: number, tutorResponsavel: string) {
        this.nome = nome;
        this.idade = idade;
        this.tutorResponsavel = tutorResponsavel;
    }

    public getNome(): string {
        return this.nome;
    }

    public abstract emitirSom(): void;
    public abstract descreverCuidadosDiarios(): string;
}

class Cachorro extends Animal {
    public emitirSom(): void {
        console.log(`${this.nome} diz: Au`);
    }

    public descreverCuidadosDiarios(): string {
        return "Precisa de passeio diário.";
    }
}

class Gato extends Animal {
    public emitirSom(): void {
        console.log(`${this.nome} diz: Miau`);
    }

    public descreverCuidadosDiarios(): string {
        return "Precisa de arranhador.";
    }
}

class Ave extends Animal {
    public emitirSom(): void {
        console.log(`${this.nome} diz: Piu`);
    }

    public descreverCuidadosDiarios(): string {
        return "Precisa de gaiola.";
    }
}

abstract class Funcionario {
    protected nome: string;
    protected matricula: string;
    private salario: number;

    constructor(nome: string, matricula: string, salarioInicial: number) {
        this.nome = nome;
        this.matricula = matricula;
        this.salario = 0;
        this.alterarSalario(salarioInicial);
    }

    public alterarSalario(novoSalario: number): void {
        if (novoSalario > 0) {
            this.salario = novoSalario;
        } else {
            console.log("Erro: O salário deve ser maior que zero.");
        }
    }

    public getSalario(): number {
        return this.salario;
    }

    public getNome(): string {
        return this.nome;
    }

    public abstract calcularBonus(): number;
}

class Veterinario extends Funcionario {
    private consultasRealizadas: number = 0;

    public registrarConsultaRealizada(): void {
        this.consultasRealizadas++;
    }

    public prescreverTratamento(animal: Animal, tratamento: string): void {
        console.log(`Dr(a). ${this.nome} prescreveu para ${animal.getNome()}: ${tratamento}`);
    }

    public calcularBonus(): number {
        return this.consultasRealizadas * 50;
    }
}

class Recepcionista extends Funcionario {
    private agendamentosConfirmados: number = 0;

    public confirmarAgendamento(): void {
        this.agendamentosConfirmados++;
    }

    public calcularBonus(): number {
        return this.agendamentosConfirmados * 15;
    }
}

class Consulta {
    private animal: Animal;
    private veterinario: Veterinario;
    private data: string;

    constructor(animal: Animal, veterinario: Veterinario, data: string) {
        if (!animal || !veterinario) {
            throw new Error("A consulta precisa ter um animal e um veterinário.");
        }
        this.animal = animal;
        this.veterinario = veterinario;
        this.data = data;
        this.veterinario.registrarConsultaRealizada();
    }

    public exibirResumo(): void {
        console.log(`Consulta em ${this.data} | Animal: ${this.animal.getNome()} | Vet: ${this.veterinario.getNome()}`);
    }
}

class ClinicaVeterinaria {
    private nome: string;
    private funcionarios: Funcionario[] = [];
    private animais: Animal[] = [];
    private consultas: Consulta[] = [];

    constructor(nome: string) {
        this.nome = nome;
    }

    public adicionarFuncionario(funcionario: Funcionario): void {
        this.funcionarios.push(funcionario);
    }

    public cadastrarAnimal(animal: Animal): void {
        this.animais.push(animal);
    }

    public registrarConsulta(consulta: Consulta): void {
        this.consultas.push(consulta);
    }

    public listarAnimais(): void {
        console.log(`\n--- Animais da ${this.nome} ---`);
        for (const animal of this.animais) {
            animal.emitirSom();
            console.log(`Cuidados: ${animal.descreverCuidadosDiarios()}`);
        }
    }
}
const clinica = new ClinicaVeterinaria("Clínica Veterinária Dona Marta");

const dog = new Cachorro("yoshi", 3, "guilherme");
const cat = new Gato("bel", 2, "julio");
const bird = new Ave("nobrin", 1, "alison");

const vet = new Veterinario("Dra. Camila", "VET-01", 4500);
const rec = new Recepcionista("Lucas", "REC-01", 2000);

clinica.cadastrarAnimal(dog);
clinica.cadastrarAnimal(cat);
clinica.cadastrarAnimal(bird);
clinica.adicionarFuncionario(vet);
clinica.adicionarFuncionario(rec);

clinica.listarAnimais();

rec.confirmarAgendamento();
rec.confirmarAgendamento();

const consulta1 = new Consulta(dog, vet, "12/11/2026");
clinica.registrarConsulta(consulta1);
consulta1.exibirResumo();
vet.prescreverTratamento(dog, "Vitamina por 7 dias");

vet.alterarSalario(5000);
console.log(`Novo salário da ${vet.getNome()}: R$ ${vet.getSalario()}`);
console.log(`Bônus da ${vet.getNome()}: R$ ${vet.calcularBonus()}`);
console.log(`Bônus do ${rec.getNome()}: R$ ${rec.calcularBonus()}`);

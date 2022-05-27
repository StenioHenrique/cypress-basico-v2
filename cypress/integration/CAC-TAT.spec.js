/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {   
        const longText='Estou digitando uma informação de teste para verificar se o comando funciona como deveria. O texto está bem longo simplesmente pq eu quis digitar muita coisa.'
        cy.get('#firstName').type('Stenio')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('steniohmsilva@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0,})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Stenio')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('steniohmsilva@gmail,com')
        cy.get('#open-text-area').type("Mais um caso de teste, dessa vez, com email errado.", {delay: 0,})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('valida que só permite a inserção de números no campo telefone', function(){
    
        cy.get('#phone').type('abcdef').should('have.value', '')
    
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Stenio')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('steniohmsilva@gmail.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type("Mais um caso de teste, dessa vez, sem telefone, com ele sendo obrigatório.", {delay: 0,})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){ 
        cy.get('#firstName')
          .type('Stenio')
          .should('have.value', 'Stenio')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Silva')
          .should('have.value', 'Silva')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('steniohmsilva@gmail.com')
          .should('have.value', 'steniohmsilva@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value', '') 
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()        
        cy.get('.error').should('be.visible')
    })
    
    it('envia o formulário com sucesso usando comando customizado', function(){ 
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"')
          .check()
          .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
              cy.wrap($radio).check()
              cy.wrap($radio).should('be.checked')
          })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')    
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
          .selectFile('cypress/fixtures/example.json')
          .then(input => { // = .should(function(input) { segue o que ta abaixo})
              expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload')
          .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
          .then(input => { // = .should(function(input) { segue o que ta abaixo})
              expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('exampleFile')
        cy.get('#file-upload')
          .selectFile('@exampleFile')
          .then(input => { 
              expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona multiplos arquivos para upload', function() {
        cy.get('#file-upload')
        .selectFile([
            'cypress/fixtures/example.json', 
            'cypress/fixtures/example.txt'
        ])
        .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
                expect(input[0].files[1].name).to.equal('example.txt')

        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})
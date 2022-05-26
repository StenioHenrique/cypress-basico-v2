Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const longText='Estou digitando uma informação de teste para verificar se o comando funciona como deveria. O texto está bem longo simplesmente pq eu quis digitar muita coisa.'
    cy.get('#firstName').type('Stenio')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('steniohmsilva@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0,})
    cy.contains('button', 'Enviar').click()
})
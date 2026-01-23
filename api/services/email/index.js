/**
 * Email Service Module
 * Main entry point - exports all email service components
 * Follows Single Responsibility Principle - only exports
 */

module.exports = {
  IEmailService: require('./IEmailService.js').IEmailService,
  ResendEmailService: require('./ResendEmailService.js').ResendEmailService,
  SMTPEmailService: require('./SMTPEmailService.js').SMTPEmailService,
  EmailServiceFactory: require('./EmailServiceFactory.js').EmailServiceFactory,
  EmailRequestDTO: require('./EmailDTO.js').EmailRequestDTO,
  EmailResponseDTO: require('./EmailDTO.js').EmailResponseDTO
};

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'pt' | 'fr';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Sidebar & Navigation
  'nav.dashboard': { en: 'Dashboard', es: 'Panel de Control', pt: 'Painel de Controle', fr: 'Tableau de bord' },
  'nav.portfolio': { en: 'Portfolio', es: 'Portafolio', pt: 'Portfólio', fr: 'Portefeuille' },
  'nav.inbox': { en: 'Inbox', es: 'Bandeja de Entrada', pt: 'Caixa de Entrada', fr: 'Boîte de réception' },
  'nav.analytics': { en: 'Analytics', es: 'Analítica', pt: 'Analítica', fr: 'Analytique' },
  'nav.settings': { en: 'Settings', es: 'Configuración', pt: 'Configurações', fr: 'Paramètres' },
  'nav.help': { en: 'Help & Support', es: 'Ayuda y Soporte', pt: 'Ajuda e Suporte', fr: 'Aide et support' },
  'nav.logout': { en: 'Logout', es: 'Cerrar Sesión', pt: 'Sair', fr: 'Déconnexion' },
  'nav.enterprise_suite': { en: 'Enterprise Suite', es: 'Suite Empresarial', pt: 'Suite Empresarial', fr: 'Suite Entreprise' },
  'nav.verified_admin': { en: 'Verified Admin', es: 'Administrador Verificado', pt: 'Administrador Verificado', fr: 'Administrateur vérifié' },

  // Settings
  'settings.title': { en: 'System Configuration', es: 'Configuración del Sistema', pt: 'Configuração do Sistema', fr: 'Configuration du système' },
  'settings.subtitle': { en: 'Manage global parameters, users, and workflows.', es: 'Administra los parámetros globales, usuarios y flujos de trabajo.', pt: 'Gerencie parâmetros globais, usuários e fluxos de trabalho.', fr: 'Gérez les paramètres globaux, les utilisateurs et les flux de travail.' },
  'settings.agents': { en: 'Agents, Roles & Permissions', es: 'Agentes, Roles y Permisos', pt: 'Agentes, Funções e Permissões', fr: 'Agents, rôles et permissions' },
  'settings.agents_desc': { en: 'Manage user access and security levels.', es: 'Gestiona el acceso de los usuarios y niveles de seguridad.', pt: 'Gerencie o acesso do usuário e os níveis de segurança.', fr: 'Gérez l\'accès des utilisateurs et les niveaux de sécurité.' },
  'settings.crm': { en: 'CRM Field Management', es: 'Gestión de Campos CRM', pt: 'Gestão de Campos CRM', fr: 'Gestion des champs CRM' },
  'settings.crm_desc': { en: 'Customize data fields for your clients and cases.', es: 'Personaliza los campos de datos para tus clientes y casos.', pt: 'Personalize os campos de dados para seus clientes e casos.', fr: 'Personnalisez les champs de données pour vos clients et dossiers.' },
  'settings.templates': { en: 'Template Management', es: 'Gestión de Plantillas', pt: 'Gestão de Modelos', fr: 'Gestion des modèles' },
  'settings.templates_desc': { en: 'Manage message and document templates.', es: 'Administra plantillas de mensajes y documentos.', pt: 'Gerencie modelos de mensagens e documentos.', fr: 'Gérez les modèles de messages et de documents.' },
  'settings.schedules': { en: 'Schedule Configuration', es: 'Configuración de Horarios', pt: 'Configuração de Horários', fr: 'Configuration des horaires' },
  'settings.schedules_desc': { en: 'Define operating hours and holidays.', es: 'Define las horas de operación y días festivos.', pt: 'Defina o horário de funcionamento e feriados.', fr: 'Définissez les heures d\'ouverture et les jours fériés.' },
  'settings.queues': { en: 'Queue Configuration', es: 'Configuración de Colas', pt: 'Configuração de Filas', fr: 'Configuration des files d\'attente' },
  'settings.queues_desc': { en: 'Configure service queues and priorities.', es: 'Configura las colas de atención y prioridades.', pt: 'Configure filas de serviço e prioridades.', fr: 'Configurez les files d\'attente et les priorités.' },
  'settings.routes': { en: 'Route Configuration', es: 'Configuración de Rutas', pt: 'Configuração de Rotas', fr: 'Configuration des routes' },
  'settings.routes_desc': { en: 'Establish intelligent routing rules.', es: 'Establece reglas de enrutamiento inteligente.', pt: 'Estabeleça regras de roteamento inteligente.', fr: 'Établissez des règles de routage intelligentes.' },
  'settings.tags': { en: 'Tagging', es: 'Etiquetado', pt: 'Etiquetagem', fr: 'Étiquetage' },
  'settings.tags_desc': { en: 'Manage tags to categorize cases and clients.', es: 'Gestiona etiquetas para categorizar casos y clientes.', pt: 'Gerencie tags para categorizar casos e clientes.', fr: 'Gérez les tags pour catégoriser les dossiers et les clients.' },

  // Agents
  'agents.title': { en: 'Agent Management', es: 'Listado de agentes', pt: 'Gestão de Agentes', fr: 'Gestion des agents' },
  'agents.create': { en: 'Create Agent', es: 'Crear Agente', pt: 'Criar Agente', fr: 'Créer un agent' },
  'agents.username': { en: 'Username', es: 'Nombre de usuario', pt: 'Nome de usuário', fr: 'Nom d\'utilisateur' },
  'agents.name': { en: 'Name', es: 'Nombre', pt: 'Nome', fr: 'Nom' },
  'agents.email': { en: 'Email', es: 'Email', pt: 'Email', fr: 'Email' },
  'agents.created_from': { en: 'Created from', es: 'Creado desde', pt: 'Criado de', fr: 'Créé à partir de' },
  'agents.created_to': { en: 'Created to', es: 'Creado hasta', pt: 'Criado até', fr: 'Créé jusqu\'à' },
  'agents.queue': { en: 'Queue', es: 'Cola', pt: 'Fila', fr: 'File d\'attente' },
  'agents.active': { en: 'Active', es: 'Activo', pt: 'Ativo', fr: 'Actif' },
  'agents.created_at': { en: 'Created', es: 'Creado', pt: 'Criado', fr: 'Créé' },
  'agents.roles': { en: 'Roles', es: 'Roles', pt: 'Funções', fr: 'Rôles' },
  'agents.showing': { en: 'Showing', es: 'Mostrando', pt: 'Exibindo', fr: 'Affichage de' },
  'agents.of': { en: 'of', es: 'de', pt: 'de', fr: 'sur' },
  'agents.total': { en: 'Total', es: 'Total', pt: 'Total', fr: 'Total' },

  // CRM Fields
  'crm.title': { en: 'CRM Fields Management', es: 'Listado de campos CRM', pt: 'Gestão de Campos CRM', fr: 'Gestion des champs CRM' },
  'crm.add': { en: 'Add Field', es: 'Añadir campo', pt: 'Adicionar campo', fr: 'Ajouter un champ' },
  'crm.name': { en: 'Name', es: 'Nombre', pt: 'Nome', fr: 'Nom' },
  'crm.type': { en: 'Type', es: 'Tipo', pt: 'Tipo', fr: 'Type' },
  'crm.required': { en: 'Required', es: 'Requerido', pt: 'Obrigatório', fr: 'Requis' },
  'crm.readonly': { en: 'Read Only', es: 'Solo lectura', pt: 'Somente leitura', fr: 'Lecture seule' },
  'crm.order': { en: 'Order', es: 'Orden', pt: 'Ordem', fr: 'Ordre' },
  'crm.default_value': { en: 'Default Value', es: 'Valor por defecto', pt: 'Valor padrão', fr: 'Valeur par défaut' },
  'crm.validation': { en: 'Validation', es: 'Validación', pt: 'Validação', fr: 'Validation' },
  'crm.created': { en: 'Created', es: 'Creado', pt: 'Criado', fr: 'Créé' },
  'crm.updated': { en: 'Updated', es: 'Actualizado', pt: 'Atualizado', fr: 'Mis à jour' },
  'crm.type_text': { en: 'Text', es: 'Texto', pt: 'Texto', fr: 'Texte' },
  'crm.type_date': { en: 'Date', es: 'Fecha', pt: 'Data', fr: 'Date' },
  'crm.type_number': { en: 'Number', es: 'Número', pt: 'Número', fr: 'Nombre' },
  'crm.type_select': { en: 'Select', es: 'Selección', pt: 'Seleção', fr: 'Sélection' },
  'crm.save': { en: 'Save Field', es: 'Guardar campo', pt: 'Salvar campo', fr: 'Enregistrer le champ' },
  'crm.cancel': { en: 'Cancel', es: 'Cancelar', pt: 'Cancelar', fr: 'Annuler' },
  'crm.delete_confirm': { en: 'Are you sure you want to delete this field?', es: '¿Estás seguro de que quieres eliminar este campo?', pt: 'Tem certeza de que deseja excluir este campo?', fr: 'Êtes-vous sûr de vouloir supprimer ce champ ?' },

  // Templates
  'templates.title': { en: 'Template Management', es: 'Gestión de Plantillas', pt: 'Gestão de Modelos', fr: 'Gestion des modèles' },
  'templates.add': { en: 'Add Template', es: 'Añadir plantilla', pt: 'Adicionar modelo', fr: 'Ajouter un modèle' },
  'templates.name': { en: 'Name', es: 'Nombre', pt: 'Nome', fr: 'Nom' },
  'templates.type': { en: 'Type', es: 'Tipo', pt: 'Tipo', fr: 'Type' },
  'templates.subject': { en: 'Subject', es: 'Asunto', pt: 'Assunto', fr: 'Sujet' },
  'templates.content': { en: 'Content', es: 'Contenido', pt: 'Conteúdo', fr: 'Contenu' },
  'templates.category': { en: 'Category', es: 'Categoría', pt: 'Categoria', fr: 'Catégorie' },

  // Schedules
  'schedules.title': { en: 'Operating Hours', es: 'Configuración de Horarios', pt: 'Configuração de Horários', fr: 'Configuration des horaires' },
  'schedules.add': { en: 'Add Schedule', es: 'Añadir horario', pt: 'Adicionar horário', fr: 'Ajouter un horaire' },
  'schedules.days': { en: 'Days', es: 'Días', pt: 'Dias', fr: 'Jours' },
  'schedules.hours': { en: 'Hours', es: 'Horas', pt: 'Horas', fr: 'Heures' },
  'schedules.timezone': { en: 'Timezone', es: 'Zona Horaria', pt: 'Fuso Horário', fr: 'Fuseau horaire' },

  // Queues
  'queues.title': { en: 'Service Queues', es: 'Configuración de Colas', pt: 'Configuração de Filas', fr: 'Configuration des files d\'attente' },
  'queues.add': { en: 'Add Queue', es: 'Añadir cola', pt: 'Adicionar fila', fr: 'Ajouter une file' },
  'queues.priority': { en: 'Priority', es: 'Prioridad', pt: 'Prioridade', fr: 'Priorité' },
  'queues.strategy': { en: 'Strategy', es: 'Estrategia', pt: 'Estratégia', fr: 'Stratégie' },

  // Routes
  'routes.title': { en: 'Routing Rules', es: 'Gestión de Rutas', pt: 'Gestão de Rotas', fr: 'Gestion des routes' },
  'routes.add': { en: 'Add Rule', es: 'Añadir ruta', pt: 'Adicionar rota', fr: 'Ajouter une route' },
  'routes.condition': { en: 'Condition', es: 'Condición', pt: 'Condição', fr: 'Condition' },
  'routes.destination': { en: 'Destination', es: 'Destino', pt: 'Destino', fr: 'Destination' },

  // Tags
  'tags.title': { en: 'Tag Management', es: 'Etiquetado', pt: 'Gestão de Etiquetas', fr: 'Gestion des tags' },
  'tags.add': { en: 'Add Tag', es: 'Añadir etiqueta', pt: 'Adicionar etiqueta', fr: 'Ajouter un tag' },
  'tags.color': { en: 'Color', es: 'Color', pt: 'Cor', fr: 'Couleur' },
  'tags.usage': { en: 'Usage', es: 'Uso', pt: 'Uso', fr: 'Utilisation' },

  // Header
  'header.search': { en: 'Search anything...', es: 'Buscar algo...', pt: 'Pesquisar algo...', fr: 'Rechercher...' },
  'header.global_ops': { en: 'Global Ops', es: 'Operaciones Globales', pt: 'Operações Globais', fr: 'Opérations mondiales' },
  'header.notifications': { en: 'Notifications', es: 'Notificaciones', pt: 'Notificações', fr: 'Notifications' },

  // Dashboard
  'db.title': { en: 'Operational Overview', es: 'Resumen Operativo', pt: 'Visão Geral Operacional', fr: 'Aperçu opérationnel' },
  'db.subtitle': { en: 'Real-time performance across all channels', es: 'Rendimiento en tiempo real en todos los canales', pt: 'Desempenho en tempo real em todos os canais', fr: 'Performance en temps réel sur tous les canaux' },
  'db.active_cases': { en: 'Active Cases', es: 'Casos Activos', pt: 'Casos Ativos', fr: 'Casos Actifs' },
  'db.avg_resolution': { en: 'Avg. Resolution', es: 'Resolución Promedio', pt: 'Resolução Média', fr: 'Résolution moyenne' },
  'db.csat_score': { en: 'CSAT Score', es: 'Puntuación CSAT', pt: 'Pontuação CSAT', fr: 'Score CSAT' },
  'db.priority_feed': { en: 'Priority Activity Feed', es: 'Feed de Actividad Prioritaria', pt: 'Feed de Atividade Prioritária', fr: 'Flux d\'activité prioritaire' },
  'db.omnichannel': { en: 'Omnichannel Integration', es: 'Integración Omnicanal', pt: 'Integração Omnicanal', fr: 'Intégration omnicanale' },
  'db.connect_channels': { en: 'Connect your communication channels', es: 'Conecta tus canales de comunicación', pt: 'Conecte seus canais de comunicação', fr: 'Connectez vos canaux de communication' },
  'db.quick_action': { en: 'Quick Action', es: 'Acción Rápida', pt: 'Ação Rápida', fr: 'Action rapide' },
  'db.date': { en: 'Oct 24, 2024', es: '24 oct, 2024', pt: '24 out, 2024', fr: '24 oct. 2024' },
  'db.time_ago': { en: '2m ago', es: 'hace 2m', pt: 'há 2m', fr: 'il y a 2m' },
  'db.message_preview': { 
    en: '"The portfolio rebalancing for Q3 hasn\'t reflected in my dashboard yet. Can you check?"', 
    es: '"El reequilibrio de la cartera para el tercer trimestre aún no se ha reflejado en mi panel. ¿Puedes revisarlo?"', 
    pt: '"O rebalanceamento do portfólio para o terceiro trimestre ainda não foi refletido no meu painel. Você pode verificar?"', 
    fr: '"Le rééquilibrage du portefeuille pour le troisième trimestre n\'est pas encore reflété dans mon tableau de bord. Pouvez-vous vérifier ?"' 
  },
  'db.team_capacity': { en: 'Team Capacity', es: 'Capacidad del Equipo', pt: 'Capacidade da Equipe', fr: 'Capacité de l\'équipe' },
  'db.sla_compliance': { en: 'SLA Compliance', es: 'Cumplimiento de SLA', pt: 'Conformidade com SLA', fr: 'Conformité SLA' },
  'db.view_all': { en: 'View All', es: 'Ver Todo', pt: 'Ver Tudo', fr: 'Voir tout' },
  'db.configure_channels': { en: 'Configure Channels', es: 'Configurar Canales', pt: 'Configurar Canais', fr: 'Configurer les canaux' },
  'db.workload_balance': { en: 'Workload Balance', es: 'Balance de Carga de Trabajo', pt: 'Equilíbrio de Carga de Trabalho', fr: 'Équilibre de la charge de travail' },
  'db.customer_service': { en: 'Customer Service', es: 'Servicio al Cliente', pt: 'Atendimento ao Cliente', fr: 'Service client' },
  'db.collections': { en: 'Collections', es: 'Cobranzas', pt: 'Cobranças', fr: 'Recouvrements' },
  'db.operations': { en: 'Operations', es: 'Operaciones', pt: 'Operações', fr: 'Opérations' },
  'db.back_office': { en: 'Back Office', es: 'Back Office', pt: 'Back Office', fr: 'Back Office' },
  'db.productivity_insight': { en: 'Productivity Insight', es: 'Información de Productividad', pt: 'Insight de Produtividade', fr: 'Aperçu de la productivité' },
  'db.productivity_message': { en: 'Your team is resolving cases 15% faster this week. Great job! Keep focusing on High Priority items.', es: 'Tu equipo está resolviendo casos un 15% más rápido esta semana. ¡Buen trabajo! Sigue enfocándote en los elementos de Alta Prioridad.', pt: 'Sua equipe está resolvendo casos 15% mais rápido esta semana. Bom trabalho! Continue focando nos itens de Alta Prioridade.', fr: 'Votre équipe résout les cas 15 % plus rapidement cette semaine. Bon travail ! Continuez à vous concentrer sur les éléments de haute priorité.' },
  'db.new_message': { en: 'New message from Alpha Meridan', es: 'Nuevo mensaje de Alpha Meridan', pt: 'Nova mensagem de Alpha Meridan', fr: 'Nouveau message de Alpha Meridan' },

  // Portfolio
  'pf.title': { en: 'Active Management', es: 'Gestión Activa', pt: 'Gestão Ativa', fr: 'Gestion active' },
  'pf.total_assets': { en: 'Total Assets Tracked', es: 'Total de Activos Rastreados', pt: 'Total de Ativos Rastreados', fr: 'Total des actifs suivis' },
  'pf.active_portfolios': { en: 'Active Portfolios', es: 'Portafolios Activos', pt: 'Portfólios Ativos', fr: 'Portefeuilles actifs' },
  'pf.avg_days': { en: 'Avg. Days to Resolution', es: 'Días Promedio para Resolución', pt: 'Média de Dias para Resolução', fr: 'Moyenne de jours pour résolution' },
  'pf.status': { en: 'Status', es: 'Estado', pt: 'Status', fr: 'Statut' },
  'pf.risk': { en: 'Risk', es: 'Riesgo', pt: 'Risco', fr: 'Risque' },
  'pf.tier': { en: 'Tier', es: 'Nivel', pt: 'Nível', fr: 'Niveau' },
  'pf.reset': { en: 'Reset Filters', es: 'Restablecer Filtros', pt: 'Redefinir Filtros', fr: 'Réinitialiser les filtres' },
  'pf.results': { en: 'Results Found', es: 'Resultados Encontrados', pt: 'Resultados Encontrados', fr: 'Résultats trouvés' },
  'pf.client_name': { en: 'Client Name', es: 'Nombre del Cliente', pt: 'Nome do Cliente', fr: 'Nom du client' },
  'pf.last_interaction': { en: 'Last Interaction', es: 'Última Interacción', pt: 'Última Interação', fr: 'Dernière interaction' },
  'pf.value': { en: 'Portfolio Value', es: 'Valor del Portafolio', pt: 'Valor do Portfólio', fr: 'Valeur du portefeuille' },
  'pf.actions': { en: 'Quick Actions', es: 'Acciones Rápidas', pt: 'Ações Rápidas', fr: 'Actions rapides' },
  'pf.authority': { en: 'Portfolio Authority', es: 'Autoridad del Portafolio', pt: 'Autoridade do Portfólio', fr: 'Autorité du portefeuille' },
  'pf.days': { en: 'Days', es: 'Días', pt: 'Dias', fr: 'Jours' },
  'pf.all_status': { en: 'All Status', es: 'Todos los Estados', pt: 'Todos os Status', fr: 'Tous les statuts' },
  'pf.open': { en: 'Open', es: 'Abierto', pt: 'Aberto', fr: 'Ouvert' },
  'pf.pending': { en: 'Pending', es: 'Pendiente', pt: 'Pendente', fr: 'En attente' },
  'pf.resolved': { en: 'Resolved', es: 'Resuelto', pt: 'Resolvido', fr: 'Résolu' },
  'pf.all_risk': { en: 'All Risk', es: 'Todos los Riesgos', pt: 'Todos os Riscos', fr: 'Tous les risques' },
  'pf.low': { en: 'Low', es: 'Bajo', pt: 'Baixo', fr: 'Faible' },
  'pf.moderate': { en: 'Moderate', es: 'Moderado', pt: 'Moderado', fr: 'Modéré' },
  'pf.high': { en: 'High', es: 'Alto', pt: 'Alto', fr: 'Élevé' },
  'pf.all_tiers': { en: 'All Tiers', es: 'Todos los Niveles', pt: 'Todos os Níveis', fr: 'Tous les niveaux' },
  'pf.tier1': { en: 'Tier 1', es: 'Nivel 1', pt: 'Nível 1', fr: 'Niveau 1' },
  'pf.standard': { en: 'Standard', es: 'Estándar', pt: 'Padrão', fr: 'Standard' },
  'pf.new_acquisition': { en: 'New Acquisition', es: 'Nueva Adquisición', pt: 'Nova Aquisição', fr: 'Nouvelle acquisition' },
  'pf.no_results': { en: 'No cases match your current filters.', es: 'No hay casos que coincidan con tus filtros actuales.', pt: 'Nenhum caso corresponde aos seus filtros atuais.', fr: 'Aucun cas ne correspond à vos filtres actuels.' },
  'pf.clear_filters': { en: 'Clear all filters', es: 'Limpiar todos los filtros', pt: 'Limpar todos os filtros', fr: 'Effacer tous les filtres' },
  'pf.displaying': { en: 'Displaying', es: 'Mostrando', pt: 'Exibindo', fr: 'Affichage de' },
  'pf.of': { en: 'of', es: 'de', pt: 'de', fr: 'sur' },
  'pf.results_pagination': { en: 'results', es: 'resultados', pt: 'resultados', fr: 'résultats' },

  // Inbox
  'ib.title': { en: 'Active Conversations', es: 'Conversaciones Activas', pt: 'Conversas Ativas', fr: 'Conversations actives' },
  'ib.all': { en: 'All', es: 'Todos', pt: 'Todos', fr: 'Tous' },
  'ib.priority': { en: 'Priority', es: 'Prioridad', pt: 'Prioridade', fr: 'Priorité' },
  'ib.unassigned': { en: 'Unassigned', es: 'Sin Asignar', pt: 'Não Atribuído', fr: 'Non assigné' },
  'ib.escalate': { en: 'Escalate', es: 'Escalar', pt: 'Escalar', fr: 'Escalader' },
  'ib.resolve': { en: 'Mark as Resolved', es: 'Marcar como Resuelto', pt: 'Marcar como Resolvido', fr: 'Marquer comme résolu' },
  'ib.send': { en: 'Send Message', es: 'Enviar Mensaje', pt: 'Enviar Mensagem', fr: 'Envoyer le message' },
  'ib.placeholder': { en: 'Write your response...', es: 'Escribe tu respuesta...', pt: 'Escreva sua resposta...', fr: 'Écrivez votre réponse...' },
  'ib.channel_selection': { en: 'Channel Selection', es: 'Selección de Canal', pt: 'Seleção de Canal', fr: 'Sélection du canal' },
  'ib.web_phone': { en: 'Web Phone', es: 'Teléfono Web', pt: 'Telefone Web', fr: 'Téléphone Web' },
  'ib.dial': { en: 'Dial Number', es: 'Marcar Número', pt: 'Discar Número', fr: 'Composer le numéro' },
  'ib.call': { en: 'Call', es: 'Llamar', pt: 'Ligar', fr: 'Appeler' },
  'ib.resolved_status': { en: 'Resolved', es: 'Resuelto', pt: 'Resolvido', fr: 'Résolu' },
  'ib.online_via': { en: 'Online via', es: 'En línea vía', pt: 'Online via', fr: 'En ligne via' },
  'ib.hide_details': { en: 'Hide Details', es: 'Ocultar Detalles', pt: 'Ocultar Detalhes', fr: 'Masquer les détails' },
  'ib.show_details': { en: 'Show Details', es: 'Mostrar Detalles', pt: 'Mostrar Detalhes', fr: 'Afficher les détails' },
  'ib.today': { en: 'Today, Oct 24', es: 'Hoy, 24 oct', pt: 'Hoje, 24 out', fr: 'Aujourd\'hui, 24 oct.' },
  'ib.agent_name': { en: 'Agent Alex', es: 'Agente Alex', pt: 'Agente Alex', fr: 'Agent Alex' },
  'ib.via': { en: 'via', es: 'vía', pt: 'via', fr: 'via' },
  'ib.voice_transcription': { en: 'Voice Transcription', es: 'Transcripción de Voz', pt: 'Transcrição de Voz', fr: 'Transcription vocale' },
  'ib.ai_assistant': { en: 'AI Assistant', es: 'Asistente de IA', pt: 'Assistente de IA', fr: 'Assistant IA' },
  'ib.client_role': { en: 'Head of Operations, NexaCorp', es: 'Jefe de Operaciones, NexaCorp', pt: 'Chefe de Operações, NexaCorp', fr: 'Chef des opérations, NexaCorp' },
  'ib.vip_client': { en: 'VIP Client', es: 'Cliente VIP', pt: 'Cliente VIP', fr: 'Client VIP' },
  'ib.growth': { en: 'Growth', es: 'Crecimiento', pt: 'Crescimento', fr: 'Croissance' },
  'ib.portfolio_summary': { en: 'Portfolio Summary', es: 'Resumen del Portafolio', pt: 'Resumo do Portfólio', fr: 'Résumé du portefeuille' },
  'ib.total_value': { en: 'Total Value', es: 'Valor Total', pt: 'Valor Total', fr: 'Valeur totale' },
  'ib.q3_yield': { en: 'Q3 Yield', es: 'Rendimiento Q3', pt: 'Rendimento Q3', fr: 'Rendement T3' },
  'ib.recent_history': { en: 'Recent History', es: 'Historial Reciente', pt: 'Histórico Recente', fr: 'Historique récent' },
  'ib.inbound_call': { en: 'Inbound Call', es: 'Llamada Entrante', pt: 'Chamada Recebida', fr: 'Appel entrant' },
  'ib.resolved_by': { en: 'Resolved by Agent Sarah • 2 days ago', es: 'Resuelto por Agente Sarah • hace 2 días', pt: 'Resolvido pelo Agente Sarah • há 2 dias', fr: 'Résolu par l\'agent Sarah • il y a 2 jours' },
  'ib.contract_renewal': { en: 'Contract Renewal', es: 'Renovación de Contrato', pt: 'Renovação de Contrato', fr: 'Renouvellement de contrat' },
  'ib.signed_digitally': { en: 'Signed digitally • 1 week ago', es: 'Firmado digitalmente • hace 1 semana', pt: 'Assinado digitalmente • há 1 semana', fr: 'Signé numériquement • il y a 1 semaine' },
  'ib.voip_connected': { en: 'Connected to SADA VoIP', es: 'Conectado a SADA VoIP', pt: 'Conectado ao SADA VoIP', fr: 'Connecté à SADA VoIP' },
  'ib.no_conversations': { en: 'No conversations found.', es: 'No se encontraron conversaciones.', pt: 'Nenhuma conversa encontrada.', fr: 'Aucune conversation trouvée.' },
  'ib.typing': { en: 'TYPING...', es: 'ESCRIBIENDO...', pt: 'DIGITANDO...', fr: 'EN TRAIN D\'ÉCRIRE...' },

  // Data Strings
  'data.tier_strategic': { en: 'Tier 1 Strategic', es: 'Nivel 1 Estratégico', pt: 'Nível 1 Estratégico', fr: 'Niveau 1 stratégique' },
  'data.tier_midmarket': { en: 'Standard Mid-Market', es: 'Mercado Medio Estándar', pt: 'Mercado Médio Padrão', fr: 'Marché moyen standard' },
  'data.tier_new': { en: 'New Acquisition', es: 'Nueva Adquisición', pt: 'Nova Aquisição', fr: 'Nouvelle acquisition' },
  'data.growth': { en: 'Growth', es: 'Crecimiento', pt: 'Crescimento', fr: 'Croissance' },
  'data.stable': { en: 'Stable', es: 'Estable', pt: 'Estável', fr: 'Stable' },
  'data.decline': { en: 'Decline', es: 'Disminución', pt: 'Declínio', fr: 'Déclin' },
  'data.at_risk': { en: 'At Risk', es: 'En Riesgo', pt: 'Em Risco', fr: 'À risque' },
  'data.vip_client': { en: 'VIP CLIENT', es: 'CLIENTE VIP', pt: 'CLIENTE VIP', fr: 'CLIENT VIP' },
  'data.enterprise_gold': { en: 'ENTERPRISE GOLD', es: 'EMPRESA ORO', pt: 'EMPRESA OURO', fr: 'ENTREPRISE OR' },
  'data.asset_management': { en: 'ASSET MANAGEMENT', es: 'GESTIÓN DE ACTIVOS', pt: 'GESTÃO DE ATIVOS', fr: 'GESTION D\'ACTIFS' },
  'data.senior_agent': { en: 'SENIOR AGENT', es: 'AGENTE SENIOR', pt: 'AGENTE SÊNIOR', fr: 'AGENT SENIOR' },
  'data.portfolio_manager': { en: 'PORTFOLIO MANAGER', es: 'GERENTE DE PORTAFOLIO', pt: 'GERENTE DE PORTFÓLIO', fr: 'GESTIONNAIRE DE PORTEFEUILLE' },

  // Analytics
  'an.title': { en: 'Performance Intelligence', es: 'Inteligencia de Rendimiento', pt: 'Inteligência de Desempenho', fr: 'Intelligence de performance' },
  'an.team_performance': { en: 'Team Performance', es: 'Rendimiento del Equipo', pt: 'Desempenho da Equipe', fr: 'Performance de l\'équipe' },
  'an.throughput': { en: 'Throughput Analysis', es: 'Análisis de Rendimiento', pt: 'Análise de Rendimento', fr: 'Analyse du débit' },
  'an.tasks_completed': { en: 'Tasks Completed', es: 'Tareas Completadas', pt: 'Tarefas Concluídas', fr: 'Tâches terminées' },
  'an.this_month': { en: 'This Month', es: 'Este Mes', pt: 'Este Mês', fr: 'Ce mois-ci' },
  'an.vs_last_month': { en: 'vs last month', es: 'vs mes anterior', pt: 'vs mês anterior', fr: 'par rapport au mois dernier' },
  'an.avg_response': { en: 'Avg Response Time', es: 'Tiempo de Respuesta Promedio', pt: 'Tempo de Resposta Médio', fr: 'Temps de réponse moyen' },
  'an.below_target': { en: 'Below target of', es: 'Por debajo del objetivo de', pt: 'Abaixo da meta de', fr: 'En dessous de l\'objectif de' },
  'an.team_efficiency': { en: 'Team Efficiency', es: 'Eficiencia del Equipo', pt: 'Eficiência da Equipe', fr: 'Efficacité de l\'équipe' },
  'an.resolved': { en: 'Resolved', es: 'Resueltos', pt: 'Resolvidos', fr: 'Résolus' },
  'an.rating': { en: 'Rating', es: 'Calificación', pt: 'Avaliação', fr: 'Évaluation' },
  'an.sla': { en: 'SLA', es: 'SLA', pt: 'SLA', fr: 'SLA' },
  'an.top_performer': { en: 'Top Performer', es: 'Mejor Rendimiento', pt: 'Melhor Desempenho', fr: 'Meilleur performeur' },
  'an.fast_responder': { en: 'Fast Responder', es: 'Respuesta Rápida', pt: 'Resposta Rápida', fr: 'Répondeur rapide' },
  'an.monthly_goal': { en: 'Monthly Goal Progress', es: 'Progreso de la Meta Mensual', pt: 'Progresso da Meta Mensal', fr: 'Progression de l\'objectif mensuel' },
  'an.active_focus': { en: 'Active Focus', es: 'Enfoque Activo', pt: 'Foco Ativo', fr: 'Focus actif' },
  'an.daily': { en: 'Daily', es: 'Diario', pt: 'Diário', fr: 'Quotidien' },
  'an.weekly': { en: 'Semanal', es: 'Semanal', pt: 'Semanal', fr: 'Hebdomadaire' },
  'an.portfolio_health': { en: 'Portfolio Health', es: 'Salud del Portafolio', pt: 'Saúde do Portfólio', fr: 'Santé du portefeuille' },
  'an.health_message': { en: 'All customer portfolio indicators are in optimal ranges. Efficiency is 4% above the quarterly baseline.', es: 'Todos los indicadores de la cartera de clientes están en rangos óptimos. La eficiencia está un 4% por encima de la línea base trimestral.', pt: 'Todos os indicadores do portfólio de clientes estão em faixas ideais. A eficiência está 4% acima da linha de base trimestral.', fr: 'Tous les indicateurs du portefeuille client sont dans des plages optimales. L\'efficacité est de 4 % supérieure à la base trimestrielle.' },
  'an.view_details': { en: 'View Details', es: 'Ver Detalles', pt: 'Ver Detalhes', fr: 'Voir les détails' },
  'an.steady': { en: 'Steady', es: 'Estable', pt: 'Estável', fr: 'Stable' },

  // Case Detail
  'cd.active_recovery': { en: 'Active Recovery', es: 'Recuperación Activa', pt: 'Recuperação Ativa', fr: 'Récupération Active' },
  'cd.client': { en: 'Client', es: 'Cliente', pt: 'Cliente', fr: 'Client' },
  'cd.current_exposure': { en: 'Current Exposure', es: 'Exposición Actual', pt: 'Exposición Atual', fr: 'Exposition Actuelle' },
  'cd.sla_countdown': { en: 'SLA Countdown', es: 'Cuenta Regresiva SLA', pt: 'Contagem Regressiva SLA', fr: 'Compte à Rebours SLA' },
  'cd.schedule_payment': { en: 'Schedule Payment', es: 'Programar Pago', pt: 'Agendar Pagamento', fr: 'Planifier le Paiement' },
  'cd.send_sms': { en: 'Send SMS Template', es: 'Enviar Plantilla SMS', pt: 'Enviar Modelo de SMS', fr: 'Envoyer un Modèle SMS' },
  'cd.escalate_legal': { en: 'Escalate to Legal', es: 'Escalar a Legal', pt: 'Escalar para o Jurídico', fr: 'Escalader au Juridique' },
  'cd.close_case': { en: 'Close Case', es: 'Cerrar Caso', pt: 'Fechar Caso', fr: 'Fermer le Dossier' },
  'cd.lifecycle': { en: 'Interaction Lifecycle', es: 'Ciclo de Vida de Interacción', pt: 'Ciclo de Vida da Interação', fr: 'Cycle de vie de l\'interaction' },
  'cd.all_activity': { en: 'All Activity', es: 'Toda la Actividad', pt: 'Toda a Atividade', fr: 'Toute l\'Activité' },
  'cd.note_placeholder': { en: 'Add internal note or update status...', es: 'Agregar nota interna o actualizar estado...', pt: 'Adicionar nota interna ou atualizar status...', fr: 'Ajouter une note interne ou mettre à jour le statut...' },
  'cd.post_note': { en: 'Post Note', es: 'Publicar Nota', pt: 'Postar Nota', fr: 'Publier la Note' },
  'cd.portfolio_health': { en: 'Portfolio Health', es: 'Salud del Portafolio', pt: 'Saúde do Portfólio', fr: 'Santé du Portefeuille' },
  'cd.benchmark': { en: 'vs Industry Benchmark (SADA-CX Standard)', es: 'vs Benchmark de la Industria (Estándar SADA-CX)', pt: 'vs Benchmark do Setor (Padrão SADA-CX)', fr: 'vs Benchmark de l\'Industrie (Standard SADA-CX)' },
  'cd.avg_pay_cycle': { en: 'Avg. Pay Cycle', es: 'Ciclo Prom. de Pago', pt: 'Ciclo Médio de Pagamento', fr: 'Cycle de Paiement Moyen' },
  'cd.risk_profile': { en: 'Risk Profile', es: 'Perfil de Riesgo', pt: 'Perfil de Risco', fr: 'Profil de Risque' },
  'cd.ai_advisor': { en: 'Architect AI Advisor', es: 'Asesor de IA Architect', pt: 'Consultor de IA Architect', fr: 'Conseiller IA Architect' },
  'cd.recommended_action': { en: 'Recommended Action', es: 'Acción Recomendada', pt: 'Ação Recomendada', fr: 'Action Recommandée' },
  'cd.offer_deferral': { en: 'Offer Structured Deferral', es: 'Ofrecer Aplazamiento Estructurado', pt: 'Oferecer Diferimento Estruturado', fr: 'Offrir un Report Structuré' },
  'cd.deferral_desc': { en: 'Historical data shows this client resolves 92% of debts when offered a 3-part split payment vs. a lump sum.', es: 'Los datos históricos muestran que este cliente resuelve el 92% de las deudas cuando se le ofrece un pago fraccionado en 3 partes frente a un pago único.', pt: 'Dados históricos mostram que este cliente resolve 92% das dívidas quando oferecido um pagamento parcelado em 3 partes vs. um pagamento único.', fr: 'Les données historiques montrent que ce client résout 92 % des dettes lorsqu\'on lui propose un paiement échelonné en 3 parties par rapport à un montant forfaitaire.' },
  'cd.generate_proposal': { en: 'Generate Proposal', es: 'Generar Propuesta', pt: 'Gerar Proposta', fr: 'Générer une Proposition' },
  'cd.secondary_action': { en: 'Secondary Action', es: 'Acción Secundaria', pt: 'Ação Secundária', fr: 'Action Secondaire' },
  'cd.sync_manager': { en: 'Sync with Account Manager', es: 'Sincronizar con Gerente de Cuenta', pt: 'Sincronizar com Gerente de Conta', fr: 'Synchroniser avec le Gestionnaire de Compte' },
  'cd.sync_desc': { en: 'There is an open cross-sell opportunity for Marcus Thorne. Coordinate before legal escalation.', es: 'Hay una oportunidad de venta cruzada abierta para Marcus Thorne. Coordine antes de la escalada legal.', pt: 'Há uma oportunidade de venda cruzada aberta para Marcus Thorne. Coordene antes da escalada jurídica.', fr: 'Il existe une opportunité de vente croisée ouverte pour Marcus Thorne. Coordonnez avant l\'escalade juridique.' },
  'cd.moderate': { en: 'Moderate', es: 'Moderado', pt: 'Moderado', fr: 'Modéré' },
  'cd.days': { en: 'Days', es: 'Días', pt: 'Dias', fr: 'Jours' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

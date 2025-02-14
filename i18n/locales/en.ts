import type { I18nMessages } from '../I18nUiMessages'

export default {
  answer: {
    explanation: {
      correct: 'Correct',
      incorrect: 'Incorrect',
      explain: 'Explain',
      askMore: 'Ask more',
      sendMessage: 'Send message',
      continue: 'Continue',
      defaultQuestion: 'Explain this to me',
    },
  },
  question: {
    trueOrFalse: {
      true: 'True',
      false: 'False',
    },
  },
  chat: {
    input: {
      placeholder: 'Type your message...',
      webSearchTooltip: 'Web search',
      searchLabel: 'Search',
      knowledgeBaseSearchTooltip: 'Knowledge base search',
      jasneIntroTooltip: 'Jasne introduction',
      issuesSearchTooltip: 'Issues search',
    },
  },
} satisfies I18nMessages

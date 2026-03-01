import type { StandardInterpretation } from '../types';

/**
 * Table III: = Functions (Restrained Characteristics)
 *
 * The = group represents characteristics which are held in reserve
 * or are being restrained. They exist but are not being employed.
 *
 * 64 entries: 8 same-color pairs + 56 mixed-color pairs.
 */
export const TABLE_III_ENTRIES: readonly StandardInterpretation[] = [
  /* ------------------------------------------------------------------ */
  /*  =0  Grey combinations                                             */
  /* ------------------------------------------------------------------ */
  {
    primary: 0,
    secondary: 0,
    colorPairName: { en: 'Grey / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Willing to participate and to allow himself to become involved, but tries to fend off conflict and disturbance in order to reduce tension.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 1,
    colorPairName: { en: 'Grey / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Relationships rarely measure up to his high emotional expectations and his need to be made much of, leading to disappointment (often characteristic of mother-fixation, taking the form of either strong attachment to, or resentment of, the mother). Always has mental reservations and tends to remain emotionally isolated and unattached.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 2,
    colorPairName: { en: 'Grey / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels he is receiving less than his share, but that he will have to conform and make the best of his situation.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 3,
    colorPairName: { en: 'Grey / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Feels listless, hemmed in and anxious; considers that circumstances are forcing him to restrain his desires. Wants to avoid open conflict with others and to have peace and quiet.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 4,
    colorPairName: { en: 'Grey / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Demanding and particular in his relations with his partner or those close to him, but careful to avoid open conflict since this might reduce his prospects of realizing his hopes and ideas.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 5,
    colorPairName: { en: 'Grey / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Egocentric and therefore quick to take offense.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 6,
    colorPairName: { en: 'Grey / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Willing to become emotionally involved and able to achieve satisfaction from sexual activity.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 7,
    colorPairName: { en: 'Grey / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Circumstances are such that he feels forced to compromise for the time being if he is to avoid being cut off from affection or from full participation.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  =1  Blue combinations                                             */
  /* ------------------------------------------------------------------ */
  {
    primary: 1,
    secondary: 1,
    colorPairName: { en: 'Blue / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Remains emotionally unattached even when involved in a close relationship.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 0,
    colorPairName: { en: 'Blue / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Has high emotional demands and is willing to involve himself in a close relationship, but not with any great depth of feeling.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 2,
    colorPairName: { en: 'Blue / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Believes that he is not receiving his share\u2014that he is neither properly understood nor adequately appreciated. Feels that he is being compelled to conform, and close relationships leave him without any sense of emotional involvement.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 3,
    colorPairName: { en: 'Blue / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Feels cut off and unhappy because of the difficulty in achieving the essential degree of co-operation and harmony which he desires.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 4,
    colorPairName: { en: 'Blue / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Exacting in his emotional demands and very particular in his choice of partner. The desire for emotional independence prevents any depth of involvement.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 5,
    colorPairName: { en: 'Blue / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Egocentric and therefore quick to take offense, leaving him rather isolated in his attachments.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 6,
    colorPairName: { en: 'Blue / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Able to obtain physical satisfaction from sexual activity but is inclined to be emotionally withdrawn, which prevents him from becoming deeply involved.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 7,
    colorPairName: { en: 'Blue / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Emotionally inhibited. Feels forced to compromise, making it difficult for him to form a stable emotional attachment.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  =2  Green combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 2,
    secondary: 2,
    colorPairName: { en: 'Green / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'The situation is preventing him from establishing himself, but he feels he must make the best of things as they are.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 0,
    colorPairName: { en: 'Green / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'An unadmitted lack of confidence makes him careful to avoid open conflict and he feels he must make the best of things as they are.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 1,
    colorPairName: { en: 'Green / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Believes that he is not receiving his share\u2014that he is neither properly understood nor adequately appreciated. Feels that he is being compelled to conform, and close relationships leave him without any sense of emotional involvement.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 3,
    colorPairName: { en: 'Green / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Unhappy at the resistance he feels whenever he tries to assert himself. Indignant and resentful because of these setbacks, but gives way apathetically and makes whatever adjustments are necessary so that he can have peace and quiet.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 4,
    colorPairName: { en: 'Green / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels that he is burdened with more than his fair share of problems. However, he sticks to his goals and tries to overcome his difficulties by being flexible and accommodating.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 5,
    colorPairName: { en: 'Green / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels that he is receiving less than his share and that there is no one on whom he can rely for sympathy and understanding. Pent-up emotions make him quick to take offense, but he realizes that he has to make the best of things as they are.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 6,
    colorPairName: { en: 'Green / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels that he cannot do much about his existing problems and difficulties and that he must make the best of things as they are. Able to achieve satisfaction through sexual activity.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 7,
    colorPairName: { en: 'Green / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Circumstances are forcing him to compromise, to restrain his demands and hopes, and to forgo for the time being some of the things he wants.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  =3  Red combinations                                              */
  /* ------------------------------------------------------------------ */
  {
    primary: 3,
    secondary: 3,
    colorPairName: { en: 'Red / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Trying to calm down and unwind after a period of over-agitation which has left him listless and devoid of energy. In need of peace and quiet; becomes irritable if this is denied him.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 0,
    colorPairName: { en: 'Red / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Distressed by the obstacles with which he is faced and in no mood for any form of activity or for further demands on him. Needs peace and quiet, and the avoidance of anything which might distress him further.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 1,
    colorPairName: { en: 'Red / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Feels cut off and unhappy because of the difficulty in achieving the essential degree of co-operation and harmony which he desires.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 2,
    colorPairName: { en: 'Red / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Unhappy at the resistance he feels whenever he tries to assert himself. However, he believes that there is little he can do and that he must make the best of the situation.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 4,
    colorPairName: { en: 'Red / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Wants to broaden his fields of activity and insists that his hopes and ideas are realistic. Distressed by the fear that he may be prevented from doing what he wants; needs both peaceful conditions and quiet reassurance to restore his confidence.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 5,
    colorPairName: { en: 'Red / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Becomes distressed when his needs or desires are misunderstood and feels that he has no one to turn to or rely on. Egocentric and therefore quick to take offense.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 6,
    colorPairName: { en: 'Red / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Feels trapped in a distressing or uncomfortable situation and seeking some way of gaining relief. Able to achieve satisfaction from sexual activity.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 7,
    colorPairName: { en: 'Red / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Circumstances are restrictive and hampering, forcing him to forgo all joys and pleasures for the time being.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  =4  Yellow combinations                                           */
  /* ------------------------------------------------------------------ */
  {
    primary: 4,
    secondary: 4,
    colorPairName: { en: 'Yellow / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Clings to his belief that his hopes and ideals are realistic, but needs encouragement and reassurance. Applies very exacting standards to his choice of a partner and wants guarantees against loss or disappointment.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 0,
    colorPairName: { en: 'Yellow / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Willing to become emotionally involved, but demanding and particular in his choice of a partner and in his relations with those close to him. Needs reassurance and is careful to avoid open conflict since this might reduce his prospects of realizing his hopes.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 1,
    colorPairName: { en: 'Yellow / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Exacting in his emotional demands, especially during moments of intimacy, leaving him frustrated in his desire for a perfect union.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 2,
    colorPairName: { en: 'Yellow / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels that he is burdened with more than his fair share of problems. However, he sticks to his goals and tries to overcome his difficulties by being flexible and accommodating.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 3,
    colorPairName: { en: 'Yellow / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Wants to broaden his fields of activity and insists that his hopes and ideas are realistic. Distressed by the fear that he may be prevented from doing what he wants; needs both peaceful conditions and quiet reassurance to restore his confidence.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 5,
    colorPairName: { en: 'Yellow / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Insists that his hopes and ideas are realistic, but needs reassurance and encouragement. Egocentric and therefore quick to take offense.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 6,
    colorPairName: { en: 'Yellow / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Very exacting in the standards he applies to his choice of a partner and seeking a rather unrealistic perfection in his sex-life.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 7,
    colorPairName: { en: 'Yellow / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Insists that his goals are realistic and sticks obstinately to them, even though circumstances are forcing him to compromise. Very exacting in the standards he applies to his choice of a partner.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  =5  Violet combinations                                           */
  /* ------------------------------------------------------------------ */
  {
    primary: 5,
    secondary: 5,
    colorPairName: { en: 'Violet / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Egocentric and therefore quick to take offense. Sensitive and sentimental, but conceals this from all except those very close to him.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 0,
    colorPairName: { en: 'Violet / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Willing to become emotionally involved as he feels rather isolated and alone. Egocentric and therefore quick to take offense, though he tries to avoid open conflict.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 1,
    colorPairName: { en: 'Violet / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels rather isolated and alone, but is too reserved to allow himself to form deep attachments. Egocentric and therefore quick to take offense.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 2,
    colorPairName: { en: 'Violet / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels that he is receiving less than his share and that there is no one on whom he can rely for sympathy and understanding. Pent-up emotions and a certain egocentricity make him quick to take offense, but he realizes that he has to make the best of things as they are.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 3,
    colorPairName: { en: 'Violet / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Becomes distressed when his needs or desires are misunderstood and feels that he has no one to turn to or rely on. Egocentric and therefore quick to take offense.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 4,
    colorPairName: { en: 'Violet / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Insists that his hopes and ideas are realistic, but needs reassurance and encouragement. Egocentric and therefore quick to take offense.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 6,
    colorPairName: { en: 'Violet / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Egocentric and quick to take offense. Able to obtain physical satisfaction from sexual activity but tends to hold aloof emotionally.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 7,
    colorPairName: { en: 'Violet / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Conditions are such that he will not let himself become intimately involved without making mental reservations.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  =6  Brown combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 6,
    secondary: 6,
    colorPairName: { en: 'Brown / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Able to achieve satisfaction from sexual activity.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 0,
    colorPairName: { en: 'Brown / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Willing to become emotionally involved and able to achieve satisfaction through sexual activity, but tries to avoid conflict.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 1,
    colorPairName: { en: 'Brown / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Able to achieve physical satisfaction from sexual activity but restless and inclined to be emotionally withdrawn, which prevents him from becoming deeply involved.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 2,
    colorPairName: { en: 'Brown / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels that he cannot do much about his existing problems and difficulties and that he must make the best of things as they are. Able to achieve physical satisfaction from sexual activity.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 3,
    colorPairName: { en: 'Brown / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Feels trapped in a distressing or uncomfortable situation and seeking some way of gaining relief. Able to achieve satisfaction through sexual activity providing no turmoil or emotional agitation is involved.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 4,
    colorPairName: { en: 'Brown / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Very exacting in the standards he applies to his choice of a partner and seeking a rather unrealistic perfection in his sex-life.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 5,
    colorPairName: { en: 'Brown / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Egocentric and therefore quick to take offense. Able to obtain physical satisfaction from sexual activity but tends to hold aloof emotionally.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 7,
    colorPairName: { en: 'Brown / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Circumstances force him to compromise and to forgo some pleasures for the time being. Capable of achieving physical satisfaction from sexual activity.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  =7  Black combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 7,
    secondary: 7,
    colorPairName: { en: 'Black / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Feels that things stand in his way, that circumstances are forcing him to compromise and forgo some pleasures for the time being.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 0,
    colorPairName: { en: 'Black / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Circumstances are such that he feels forced to compromise for the time being if he is to avoid being cut off from affection or from full participation.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 1,
    colorPairName: { en: 'Black / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Emotionally inhibited. Feels forced to compromise, making it difficult for him to form a stable emotional attachment.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 2,
    colorPairName: { en: 'Black / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Circumstances are forcing him to compromise, to restrain his demands and hopes, and to forgo for the time being some of the things he wants.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 3,
    colorPairName: { en: 'Black / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Circumstances are restrictive and hampering, forcing him to forgo all joys and pleasures for the time being.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 4,
    colorPairName: { en: 'Black / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Insists that his goals are realistic and sticks obstinately to them, even though circumstances are forcing him to compromise. Very exacting in the standards he applies to his choice of a partner.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 5,
    colorPairName: { en: 'Black / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Conditions are such that he will not let himself become intimately involved without making mental reservations.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 6,
    colorPairName: { en: 'Black / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Circumstances force him to compromise and to forgo some pleasures for the time being. Capable of achieving physical satisfaction through sexual activity.',
      ar: '[AR]',
    },
  },
] as const;

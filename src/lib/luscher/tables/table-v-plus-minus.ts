import type { StandardInterpretation } from '../types';

/**
 * Table V: +- Functions (Actual Problem)
 *
 * The +- group combines the most desired (+ function) with the most
 * rejected (- function), revealing the actual problem or conflict
 * which the person is experiencing.
 *
 * 64 entries: 8 same-color pairs + 56 mixed-color pairs.
 */
export const TABLE_V_ENTRIES: readonly StandardInterpretation[] = [
  /* ------------------------------------------------------------------ */
  /*  +0  Grey combinations                                             */
  /* ------------------------------------------------------------------ */
  {
    primary: 0,
    secondary: 0,
    colorPairName: { en: 'Grey / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Denotes an ambivalent attitude varying between cautious reserve and the fear of not receiving his due.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 1,
    colorPairName: { en: 'Grey / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Anxiety and restless dissatisfaction, either with circumstances or with unfulfilled emotional requirements, have produced tension and stress. His attempt to escape from these consists of creating at least an outward semblance of peace by refusing to allow himself to be involved.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 2,
    colorPairName: { en: 'Grey / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Failure to establish himself in a manner consonant with his own high opinion of his worth, combined with the continued effort to prove himself with inadequate resources, have resulted in considerable stress. Tries to escape from these excessive demands on his meager reserves by adopting a defensive attitude in which he refuses to be committed, or to be involved in further unpleasantness.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 3,
    colorPairName: { en: 'Grey / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Depleted vitality has created an intolerance for any further stimulation, or demands on his resources. A feeling of powerlessness subjects him to agitation, irritation and acute distress from which he tries to escape by refusing further direct participation. He confines himself to a cautious approach and a concealed determination to get his own way in the end.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 4,
    colorPairName: { en: 'Grey / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Disappointment at the non-fulfillment of his hopes and the fear that to formulate fresh goals will only lead to further setbacks have resulted in considerable anxiety. He tries to escape from this by withdrawing and protecting himself with an attitude of cautious reserve. Moody and depressed.',
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
      en: 'Needs to protect himself against his tendency to be too trusting, as he finds it is liable to be misunderstood or exploited by others. As a result, he adopts a critical and stand-offish attitude, being willing to participate only where he can be assured of sincerity and trustworthiness.',
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
      en: 'The unsatisfied desire to be respected, to stand out from amongst his fellows, is causing some anxiety. As a result, normal gregariousness is suppressed and he refuses to allow himself to become involved, or to participate with others in their ordinary activities.',
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
      en: 'Fears that his independence will be threatened or severely restricted unless he protects himself from any outside influence. Does not want to be bothered.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  +1  Blue combinations                                             */
  /* ------------------------------------------------------------------ */
  {
    primary: 1,
    secondary: 1,
    colorPairName: { en: 'Blue / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Denotes an ambivalent attitude varying between a relaxed contentment and a restless dissatisfaction.',
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
      en: 'Needs to achieve a stable and peaceful condition, enabling him to free himself of the worry that he may be prevented from achieving all the things he wants.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 2,
    colorPairName: { en: 'Blue / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'The tensions and stresses induced by trying to cope with conditions which are really beyond his capabilities or reserves of strength have led to considerable anxiety, and a sense of personal (but unadmitted) inadequacy. He seeks to escape into a more peaceful and problem-free situation, in which he will no longer have to assert himself or contend with so much pressure.',
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
      en: 'Depleted vitality has created an intolerance for any further stimulation, or demands on his resources. A feeling of powerlessness subjects him to agitation and acute distress. Tries to escape from this by relinquishing the struggle, and by finding peaceful and restful conditions in which to recuperate in an atmosphere of affection and security.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 4,
    colorPairName: { en: 'Blue / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Disappointment at the non-fulfilment of his hopes and the fear that to formulate fresh goals will only lead to further setbacks have resulted in considerable anxiety. He is trying to escape from this into a peaceful and harmonious relationship, protecting him from dissatisfaction and lack of appreciation.',
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
      en: 'Needs to protect himself against his tendency to be too trusting, as he finds it is liable to be misunderstood or exploited by others. Is therefore seeking a relationship providing peaceful and understanding intimacy, and in which each knows exactly where the other stands.',
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
      en: 'Wants to be valued and respected, and seeks this from a close and peaceful association of mutual esteem.',
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
      en: 'Does not wish to be involved in differences of opinion, contention or argument, preferring to be left in peace.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  +2  Green combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 2,
    secondary: 2,
    colorPairName: { en: 'Green / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Denotes an ambivalent attitude varying between self-insistence and the desire to escape the pressures which oppose it.',
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
      en: 'Afraid that he may be prevented from achieving the things he wants and therefore demands that others should recognize his right to them.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 1,
    colorPairName: { en: 'Green / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Anxiety and restless dissatisfaction, either with his circumstances or with unfulfilled emotional demands, have produced stress. He tries to escape from these by denying their existence, concealing his dissatisfaction behind a proud but illusory claim to self-sufficiency and independence.',
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
      en: 'Depleted vitality has created an intolerance for any further stimulation, or demands on his resources. This sense of powerlessness, combined with frustration that he cannot control events, subjects him to agitation, irritation and acute distress. He tries to escape from these by stubborn insistence on his own point of view, but the general condition of helplessness renders this often unsuccessful. Is therefore very sensitive to criticism and quick to take offense.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 4,
    colorPairName: { en: 'Green / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Disappointment and the fear that there is no point in formulating fresh goals have led to anxiety. Desires recognition and position, but is worried about his prospects. Reacts to this by protesting at any criticism and resisting any attempt to influence him. Tries to assert himself by meticulous control of detail in an effort to strengthen his position.',
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
      en: 'Works to strengthen his position and bolster his self-esteem by examining his own accomplishments (and those of others) with critical appraisal and scientific discrimination. Insists on having things clear-cut and unequivocal.',
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
      en: 'Needs to be valued and respected as an exceptional individual, in order to increase his self-esteem and his feeling of personal worth. Resists mediocrity and sets himself high standards.',
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
      en: 'Strongly resists outside influence and any interference with his freedom to make his own decisions and plans. Works to establish and strengthen his own position.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  +3  Red combinations                                              */
  /* ------------------------------------------------------------------ */
  {
    primary: 3,
    secondary: 3,
    colorPairName: { en: 'Red / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Denotes an ambivalent attitude varying between the desire to have his own way and the need to be left in peace.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 0,
    colorPairName: { en: 'Red / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'The fear that he may be prevented from achieving the things he wants leads him to play his part with an urgent and hectic intensity.',
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
      en: 'Anxiety and a restless dissatisfaction, either with circumstances or with unfulfilled emotional needs, have produced stress. He tries to escape by intense activity, directed either towards personal success or towards variety of experience.',
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
      en: 'The tensions induced by trying to cope with conditions which are really beyond his capabilities, or his reserves of strength, have led to considerable anxiety and to a sense of personal (but unadmitted) inadequacy. He attempts to remedy this by intense activity and by insistence on getting his own way. Faulty self-control can lead to ungovernable displays of anger.',
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
      en: 'Disappointment and the fear that there is no point in formulating fresh goals have led to stress and anxiety. He wants congenial contact with others and scope for development, but feels that his relationships are empty and his progress impeded. He reacts with an intense and zealous activity designed to achieve his aims at all costs.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 5,
    colorPairName: { en: 'Red / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Wants to act freely and uninhibitedly, but is restrained by his need to have things on a rational, consistent and clearly-defined basis.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 6,
    colorPairName: { en: 'Red / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Takes a delight in action and wants to be respected and esteemed for his personal accomplishments.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 7,
    colorPairName: { en: 'Red / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Fights against restriction or limitation, and insists on developing freely as a result of his own efforts.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  +4  Yellow combinations                                           */
  /* ------------------------------------------------------------------ */
  {
    primary: 4,
    secondary: 4,
    colorPairName: { en: 'Yellow / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Denotes an ambivalent attitude varying between an optimistic desire for fulfillment and a gloomy pessimism.',
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
      en: 'The fear that he may be prevented from achieving the things he wants leads him into a restless search for satisfaction in the pursuit of illusory or meaningless activities.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 1,
    colorPairName: { en: 'Yellow / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Anxiety and restless dissatisfaction, either with his circumstances or with unfulfilled emotional needs, have produced considerable stress. He feels misunderstood, disoriented and unsettled. This drives him into a search for new conditions or relationships, in the hope that these might offer greater contentment and peace of mind.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 2,
    colorPairName: { en: 'Yellow / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'The tensions induced by trying to cope with conditions which are really beyond his capabilities, or reserves of strength, have led to considerable anxiety and a sense of personal (but unadmitted) inadequacy. He reacts by seeking outside confirmation of his ability and value in order to bolster his self-esteem. Inclined to blame others so that he may shift the blame from himself. Anxiously searching for solutions and prone to compulsive inhibitions and compulsive desires.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 3,
    colorPairName: { en: 'Yellow / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Agitation, unpredictability and irritation accompanying depleted vitality and intolerance of further demands have all placed him in a position in which he feels menaced by his circumstances. Feeling powerless to remedy this by any action of his own, he is desperately hoping that some solution will provide a way of escape.',
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
      en: 'Intensely critical of the existing conditions which he feels are disorganized or insufficiently clear-cut. Is therefore seeking some solution which will clarify the situation and introduce a more acceptable degree of order and method.',
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
      en: 'Feels insufficiently valued in his existing situation, and is seeking different conditions in which he will have greater opportunity of demonstrating his worth.',
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
      en: 'Feels restricted and prevented from progressing; seeking a solution which will remove these limitations.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  +5  Violet combinations                                           */
  /* ------------------------------------------------------------------ */
  {
    primary: 5,
    secondary: 5,
    colorPairName: { en: 'Violet / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Denotes an ambivalent attitude varying between the desire for uncritical companionship and disdain of others for their lack of taste and understanding.',
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
      en: 'Has a fear that he may be prevented from achieving the things he wants. This leads him to employ great personal charm in his dealings with others, hoping that this will make it easier for him to reach his objectives.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 1,
    colorPairName: { en: 'Violet / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Anxiety and a restless dissatisfaction, either with his circumstances or with unfulfilled emotional needs, have produced considerable stress. He tries to escape into an idealized atmosphere of sympathy and understanding, or into a substitute environment of estheticism and beauty.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 2,
    colorPairName: { en: 'Violet / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'The tensions induced by trying to cope with conditions which are really beyond his capabilities, or reserves of strength, have led to considerable anxiety and a sense of personal (but unadmitted) inadequacy. He attempts to escape from this into a substitute world in which things are more nearly as he desires them to be.',
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
      en: 'Depleted vitality has created an intolerance for any further stimulation, or demands on his resources. This feeling of powerlessness subjects him to agitation and acute distress. He attempts to escape from this into an illusory substitute world in which things are more nearly as he desires them to be.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 4,
    colorPairName: { en: 'Violet / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'Disappointment and the fear that there is no point in formulating fresh goals have led to anxiety, and he is distressed by the lack of any close and understanding relationship. He attempts to escape into a substitute world in which these disappointments are submerged and things are more nearly as he desires them to be.',
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
      en: 'Greatly impressed by the unique, by originality and by individuals of outstanding characteristics. Tries to emulate the characteristics he admires and to display originality in his own personality.',
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
      en: 'Seeks to avoid criticism and to prevent restriction of his freedom to act, and to decide for himself by the exercise of great personal charm in his dealings with others.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  +6  Brown combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 6,
    secondary: 6,
    colorPairName: { en: 'Brown / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Denotes an ambivalent attitude varying between a need for contented security and a desire for special recognition.',
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
      en: 'The fear that he may be prevented from achieving the things he wants increases his need for security and freedom from conflict. Is therefore seeking stability and an environment in which he can relax.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 1,
    colorPairName: { en: 'Brown / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Anxiety and a restless dissatisfaction, either with circumstances or with unfulfilled emotional needs, have produced considerable stress. He tries to escape from these into a conflict-free security in which he can relax and recover.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 2,
    colorPairName: { en: 'Brown / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'The tensions induced by trying to cope with conditions which are really beyond his capabilities, or his reserves of strength, have led to considerable anxiety and a sense of personal (but unadmitted) inadequacy. He attempts to escape from this into a stable and secure environment in which he can relax and recover, free from any further demands on him.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 3,
    colorPairName: { en: 'Brown / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Depleted vitality has created an intolerance for any further stimulation, or demands on his resources. This sense of powerlessness subjects him to agitation and acute distress. He attempts to escape into a stable and secure environment in which he can relax and recover.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 4,
    colorPairName: { en: 'Brown / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Disappointment and the fear that there is no point in formulating fresh goals have led to anxiety, and he is distressed by the lack of any close understanding relationship or adequate appreciation. He attempts to escape into a stable and secure environment in which he can relax and feel more contented.',
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
      en: 'Wishes to safeguard himself against criticism or conflict and to entrench himself in a stable and secure position; but is himself inclined to be critical of others and difficult to please.',
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
      en: 'Seeks security and a position in which he will no longer be troubled by demands being made on him.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  +7  Black combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 7,
    secondary: 7,
    colorPairName: { en: 'Black / Black', ar: '[AR]' },
    frequency: '',
    asterisks: 0,
    text: {
      en: 'Denotes an ambivalent attitude varying between normal individualism and a stubborn denigration of any other viewpoint.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 0,
    colorPairName: { en: 'Black / Grey', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'The fear that he may be prevented from achieving the things he wants drives him to the exploitation of all types of experience, so that he may categorically deny that any of them has any value. This destructive denigration becomes his method of concealing hopelessness and a profound sense of futility.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 1,
    colorPairName: { en: 'Black / Blue', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Anxiety and a restless dissatisfaction, either with circumstances or with unfulfilled emotional needs, have produced considerable stress. He reacts by putting this down to a total lack of understanding on the part of others, and by adopting a scornful and defiant attitude.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 2,
    colorPairName: { en: 'Black / Green', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'The tensions induced by trying to cope with conditions which are really beyond his capabilities, or his reserves of strength, have led to considerable anxiety and a sense of personal (but unadmitted) inadequacy. His inability to enforce his will causes him to over-react in stubborn defiance and by assigning to others all the blame for his own failures.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 3,
    colorPairName: { en: 'Black / Red', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Depleted vitality has created an intolerance for any further stimulation, or demands on his resources. This feeling of powerlessness subjects him to agitation and acute distress. He reacts by considering that he has been victimized, and insists\u2014with indignation, resentment and defiance\u2014on being given his own way.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 4,
    colorPairName: { en: 'Black / Yellow', ar: '[AR]' },
    frequency: '',
    asterisks: 2,
    text: {
      en: 'Disappointment and the fear that there is no point in formulating fresh goals have led to anxiety, emptiness and an unadmitted self-contempt. His refusal to admit this leads to his adopting a headstrong and defiant attitude.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 5,
    colorPairName: { en: 'Black / Violet', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'His natural ability to examine everything with critical discrimination has been distorted into an attitude of harsh disapproval, which opposes and denigrates without regard to the real facts.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 6,
    colorPairName: { en: 'Black / Brown', ar: '[AR]' },
    frequency: '',
    asterisks: 1,
    text: {
      en: 'The need for esteem\u2014for the chance to play some outstanding part and make a name for himself\u2014has become imperative. He reacts by insisting on being the center of attention, and refuses to play an impersonal or minor role.',
      ar: '[AR]',
    },
  },
] as const;

import type { MinusInterpretation } from '../types';

/**
 * Table IV: - Functions (Rejected Colors / Stress Sources)
 *
 * The - group represents characteristics which are suppressed or
 * rejected as being inappropriate. They indicate the source of
 * stress and the nature of the conflict.
 *
 * Each entry has three interpretation fields:
 *   - physiological: physical symptoms and tendencies
 *   - psychological: mental and emotional state
 *   - inBrief: concise summary
 *
 * 64 entries: 8 same-color pairs + 56 mixed-color pairs.
 */
export const TABLE_IV_ENTRIES: readonly MinusInterpretation[] = [
  /* ------------------------------------------------------------------ */
  /*  -0  Grey combinations                                             */
  /* ------------------------------------------------------------------ */
  {
    primary: 0,
    secondary: 0,
    colorPairName: { en: 'Grey / Grey', ar: '[AR]' },
    frequency: '23.1%',
    asterisks: 0,
    physiological: {
      en: 'Displays impatience and agitation (in 8th position, and especially when classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels that life has far more to offer and that there are still important things to be achieved--that life must be experienced to the full. As a result, he pursues his objectives with a fierce intensity and will not let go of things. Becomes deeply involved and runs the risk of being unable to view things with sufficient objectivity, or calmly enough; is therefore in danger of becoming agitated and of exhausting his nervous energy. Cannot leave things alone and feels he can only be at peace when he has finally reached his goal.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Impatient involvement.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 1,
    colorPairName: { en: 'Grey / Blue', ar: '[AR]' },
    frequency: '0.9%',
    asterisks: 2,
    physiological: {
      en: 'Refuses to relax or give in. Holding exhaustion and depression at bay by keeping active (especially in 7th & 8th positions; but also, to a lesser extent, in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'An existing situation or relationship is unsatisfactory, but he feels unable to change it to bring about the sense of belonging which he needs. Unwilling to expose his vulnerability, he therefore continues to resist this state of affairs, but feels dependent on the attachment. This not only depresses him but makes him irritable and impatient, producing considerable restlessness and the urge to get away from the situation, either actually or, at least, mentally. Ability to concentrate may suffer.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Restless dissatisfaction.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 2,
    colorPairName: { en: 'Grey / Green', ar: '[AR]' },
    frequency: '0.4%',
    asterisks: 2,
    physiological: {
      en: 'Will-power and perseverance are in danger of being overwhelmed by excessive stress (especially in 7th & 8th positions, but also in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Resilience and tenacity have become weakened. Feels overtaxed, worn out and getting nowhere, but continues to stand his ground. He feels this adverse situation as an actual tangible pressure which is intolerable to him and from which he wants to escape, but he feels unable to make the necessary decision.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Unresolved pressure.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 3,
    colorPairName: { en: 'Grey / Red', ar: '[AR]' },
    frequency: '0.5%',
    asterisks: 2,
    physiological: {
      en: 'Suppressed agitation resulting from the attempt to resist any form of stimulation or excitement. Can lead to irritability, angry outbursts or even sexual neuroses. There is a possibility of cardiac complaints.',
      ar: '[AR]',
    },
    psychological: {
      en: 'The situation is regarded as threatening and dangerous. Outraged at the thought that he will be unable to achieve his goals and distressed at his feeling of helplessness. Over-extended and feels beset, possibly to the point of nervous prostration.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Helpless irritability.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 4,
    colorPairName: { en: 'Grey / Yellow', ar: '[AR]' },
    frequency: '1.7%',
    asterisks: 2,
    physiological: {
      en: 'Stresses resulting from disappointment have led to agitation (especially in 7th & 8th positions, but also, to a lesser extent, in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Unfulfilled expectations have led to uncertainty and an apprehensive watchfulness. Badly needs to feel secure and protected against further disappointment, being passed over, or losing standing and prestige. Doubtful that things will be any better in the future, but inclined nevertheless to make exaggerated demands and to reject compromise.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Apprehensive insecurity.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 5,
    colorPairName: { en: 'Grey / Violet', ar: '[AR]' },
    frequency: '1.7%',
    asterisks: 0,
    physiological: {
      en: 'Stress due to suppressed sensitivity (in 7th & 8th positions, and especially when classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Delights in the tasteful, the gracious and the sensitive, but maintains his attitude of critical appraisal and refuses to be swept off his feet unless genuineness and integrity can be absolutely vouched for. Therefore keeps a strict and watchful control on his emotional relationships as he must know exactly where he stands. Demands complete sincerity as a protection against his own tendency to be too trusting.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Controlled responsiveness.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 6,
    colorPairName: { en: 'Grey / Brown', ar: '[AR]' },
    frequency: '3.8%',
    asterisks: 0,
    physiological: {
      en: 'Suppression of the physical and nervous requirements of the body (in 7th & 8th positions, and especially when classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'The existing situation is disagreeable. Has an unsatisfied need to ally himself with others whose standards are as high as his own, and to stand out from the rank and file. His control of his sensual instincts restricts his ability to give himself, but the resulting isolation leads to the urge to surrender and allow himself to merge with another. This disturbs him, as such instincts are regarded as weaknesses to be overcome; he feels that only by continued self-restraint can he hope to maintain his attitude of individual superiority. Wants to be loved or admired for himself alone; needs attention, recognition and the esteem of others.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Demands esteem as an exceptional individual.',
      ar: '[AR]',
    },
  },
  {
    primary: 0,
    secondary: 7,
    colorPairName: { en: 'Grey / Black', ar: '[AR]' },
    frequency: '15.3%',
    asterisks: 0,
    physiological: {
      en: 'Pronounced susceptibility to outside stimuli (in 7th & 8th positions, and especially when classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Wants to overcome a feeling of emptiness and to bridge the gap which he feels separates him from others. Anxious to experience life in all its aspects, to explore all its possibilities and to live it to the full. He therefore resents any restriction or limitation being imposed on him and insists on being free and unhampered.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Expectant self-determinism.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  -1  Blue combinations                                             */
  /* ------------------------------------------------------------------ */
  {
    primary: 1,
    secondary: 1,
    colorPairName: { en: 'Blue / Blue', ar: '[AR]' },
    frequency: '4.7%',
    asterisks: 1,
    physiological: {
      en: 'Refuses to relax or give in. Holding exhaustion and depression at bay by keeping active (especially in 8th position; far less so in 6th position).',
      ar: '[AR]',
    },
    psychological: {
      en: 'An existing situation or relationship is unsatisfactory, but he feels unable to change it to bring about the sense of belonging which he needs. Unwilling to expose his vulnerability, he therefore continues to resist this state of affairs, but feels dependent on the attachment. This not only depresses him but makes him irritable and impatient, producing considerable restlessness and the urge to get away from the situation, either actually or, at least, mentally. Ability to concentrate may suffer.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Restless dissatisfaction.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 0,
    colorPairName: { en: 'Blue / Grey', ar: '[AR]' },
    frequency: '1.5%',
    asterisks: 1,
    physiological: {
      en: 'Displays impatience and restlessness and inclined to be depressed (in 7th & 8th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels he cannot control the situation to create the sense of belonging he needs, and so remains unwilling to place himself unreservedly in another\'s hands. Is resisting a condition or a relationship which he regards as a discouraging responsibility. Feels life has far more to offer and is likely to remain impatient and irritable until he has obtained all he feels he still lacks. The urge to get away from this unsatisfactory state leads to restlessness and instability. Concentration may suffer.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Restless and impatient non-fulfillment.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 2,
    colorPairName: { en: 'Blue / Green', ar: '[AR]' },
    frequency: '0.2%',
    asterisks: 3,
    physiological: {
      en: 'Will power and perseverance are in danger of being overwhelmed by excessive stress. (Especially in 7th & 8th positions, but also in 6th & 7th.)',
      ar: '[AR]',
    },
    psychological: {
      en: 'Resilience and tenacity are being overtaxed by the continued attempt to overcome existing difficulties. Sticks to his objectives but feels subjected to intolerable pressure. Considers it impossible to change the situation into one of co-operation and mutual trust and so desires to be free of it altogether.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Pressure arising from stress and discord.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 3,
    colorPairName: { en: 'Blue / Red', ar: '[AR]' },
    frequency: '0.2%',
    asterisks: 3,
    physiological: {
      en: 'Suppressed agitation resulting from unsatisfactory or discordant personal relationships. Can lead to irritability, angry outbursts or sexual neuroses. There is a possibility of cardiac complaints.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Considerable distress is arising from some unsatisfactory relationship. He feels helpless to restore affinity and any semblance of mutual trust, so the situation is regarded as a depressing and unhappy state which he must continue to tolerate. Beset to the point of nervous prostration.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Helpless and irritable disharmony.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 4,
    colorPairName: { en: 'Blue / Yellow', ar: '[AR]' },
    frequency: '0.3%',
    asterisks: 3,
    physiological: {
      en: 'Stress and anxiety have resulted from emotional disappointment (especially in 7th & 8th positions, but also in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'An emotional relationship is no longer running smoothly, has proved deeply disappointing and is now regarded as a depressing tie. While on the one hand, he would like to free himself from this attachment altogether, yet, on the other, he does not want to lose anything nor risk uncertainty and the possibility of further disappointment. These contradictory emotions aggravate him to such an extent that he tries to suppress them beneath an aloof and severe attitude.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Stress arising from emotional disappointment.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 5,
    colorPairName: { en: 'Blue / Violet', ar: '[AR]' },
    frequency: '2.0%',
    asterisks: 1,
    physiological: {
      en: 'Stress arising from lack of mutual understanding (especially in 7th & 8th positions; less so in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'An existing situation is unsatisfactory and he feels unable to improve it without willing co-operation. The need for understanding and for affectionate give-and-take remains unsatisfied; he now has a feeling of being tied down, giving rise to impatience, irritability and the desire to escape.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Impatience arising from continued misunderstanding.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 6,
    colorPairName: { en: 'Blue / Brown', ar: '[AR]' },
    frequency: '0.6%',
    asterisks: 1,
    physiological: {
      en: 'Emotional discontent and lack of appreciation have led to stress and excessive self-restraint (in 7th & 8th positions; far less significant in 6th & 7th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels he must have co-operation before the existing situation can be improved. Lack of understanding and appreciation makes him feel no real bond exists, and discontent gives rise to a touchy sensitivity; he wants to feel safer and more at ease. He would like to get away from what he now considers a depressing tie and re-establish his own individuality. His sensual self-restraint makes it difficult for him to give himself, but the resulting isolation leads to the urge to surrender and merge with another. This disturbs him as he regards such instincts as weaknesses to be overcome--he feels that he can only assert his own individuality by continued self-restraint, that this alone will allow him to stand his ground through his present difficulties.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Emotional discontent arising from lack of appreciation and undue self-restraint.',
      ar: '[AR]',
    },
  },
  {
    primary: 1,
    secondary: 7,
    colorPairName: { en: 'Blue / Black', ar: '[AR]' },
    frequency: '4.9%',
    asterisks: 1,
    physiological: {
      en: 'Emotional dissatisfaction has given rise to a touchy and impatient desire for independence, leading to stress and restlessness (in 7th & 8th positions; less severe in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'An existing situation or relationship is unsatisfactory, but he feels unable to improve it without willing co-operation. Unwilling to expose his vulnerability and therefore considers it inadvisable to display affection or be over-demonstrative. He regards the relationship as a depressing tie but, although he wants to be independent and unhampered, he does not want to risk losing anything. All this leads him to react touchily and with impatience while the urge to "get away from it all" results in considerable restlessness. The ability to concentrate may suffer.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Restless instability arising from emotional dissatisfaction.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  -2  Green combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 2,
    secondary: 2,
    colorPairName: { en: 'Green / Green', ar: '[AR]' },
    frequency: '2.8%',
    asterisks: 2,
    physiological: {
      en: 'Will power, resilience and the ability to stand up to opposition are in danger of being overwhelmed by excessive stress (especially in 8th position; in 6th position this is less pronounced, but still present).',
      ar: '[AR]',
    },
    psychological: {
      en: 'The tenacity and strength of will necessary to contend with existing difficulties has become weakened. Feels overtaxed, worn out and getting nowhere, but continues to stand his ground. He feels this adverse situation as an actual tangible pressure which is intolerable to him and from which he wants to escape, but he feels unable to make the necessary decision.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Reluctance to take the steps necessary to resolve a stress situation.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 0,
    colorPairName: { en: 'Green / Grey', ar: '[AR]' },
    frequency: '0.7%',
    asterisks: 2,
    physiological: {
      en: 'The ability to withstand pressure has been overtaxed, leading to stress and frustration, impatience and irritability (especially in 7th & 8th positions; but also, to a lesser extent, in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Has lost the resilience and strength of will necessary to contend with existing difficulties. Feels overtaxed and getting nowhere, but continues to stand his ground and still pursues his objectives with a fierce intensity. This subjects him to intolerable pressure from which he wants to escape, but he cannot bring himself to make the necessary decision. As a result he remains firmly involved in the problem and can neither view it objectively nor get rid of it--he cannot leave it alone and feels he will only be at peace when he has reached his objective.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Unresolved involvement.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 1,
    colorPairName: { en: 'Green / Blue', ar: '[AR]' },
    frequency: '0.3%',
    asterisks: 3,
    physiological: {
      en: 'Emotional dissatisfaction and reduced ability to withstand opposition or difficulties are producing stress and frustration.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Has lost the resilience and strength of will necessary to contend with existing difficulties, which appear to him as deliberate opposition. Stands his ground, but is subjected to intolerable pressure. Needs co-operation and emotional fulfillment and feels that, in their absence, there is nothing he can do to improve the current situation. Wants to "get away from it all" quickly.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Pressure arising from stress and discord.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 3,
    colorPairName: { en: 'Green / Red', ar: '[AR]' },
    frequency: '0.2%',
    asterisks: 3,
    physiological: {
      en: 'Distress and agitation resulting from the attempt to avoid any form of stimulation or excitement. Regards his environment as hostile and is under great pressure. Irritable or angry outbursts, with the possibility of sexual neuroses or cardiac complaints.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Distressed by the apparent hostility of the environment. Feels coerced and subjected to intolerable pressure. Is rebellious and resentful of what he regards as unreasonable demands on him, but feels powerless to control the situation and unable to protect himself.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Helpless rebelliousness.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 4,
    colorPairName: { en: 'Green / Yellow', ar: '[AR]' },
    frequency: '0.4%',
    asterisks: 3,
    physiological: {
      en: 'Stress and anxiety due to conflict between hope and necessity, following acute disappointment.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Disappointment and unfulfilled hopes have given rise to an anxious uncertainty, while doubts that things will be any better in the future lead to the postponement of essential decisions. This conflict between hope and necessity is creating considerable pressure. Instead of resolving this by facing up to making the essential decision, he is likely to immerse himself in the pursuit of trivialities as an escape route.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Frustrated vacillation.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 5,
    colorPairName: { en: 'Green / Violet', ar: '[AR]' },
    frequency: '1.0%',
    asterisks: 1,
    physiological: {
      en: 'Stress resulting from a feeling of belittlement and misunderstanding (especially in 7th & 8th positions; materially less in 6th & 7th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels in an invidious position: that trust, affection and understanding are being withheld and that he is being treated with a humiliating lack of consideration. Considers he is being denied the appreciation essential to his self-esteem and that there is nothing he can do about it. Disheartened by the lone struggle against difficulties with no encouragement. Feels he is getting nowhere; that, instead of the admiration he needs, he is consistently misunderstood. Wants to escape from the situation but cannot find the strength of mind to make the necessary decision.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Humiliated by lack of appreciation.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 6,
    colorPairName: { en: 'Green / Brown', ar: '[AR]' },
    frequency: '0.7%',
    asterisks: 1,
    physiological: {
      en: 'Stress resulting from excessive self-restraint in the attempt to win the regard and esteem of others (especially in 7th & 8th positions; materially less in 6th & 7th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Has an unsatisfied need to ally himself with others whose standards are as high as his own, and to stand out from the rank and file. This subjects him to considerable stress, but he sticks to his attitudes despite lack of appreciation. Finds the situation uncomfortable and would like to break away from it, but refuses to compromise with his opinions. Unable to resolve the situation because he continually postpones making the necessary decision as he doubts his ability to withstand the opposition which would result. Needs the esteem of others, compliance with his wishes and respect for his opinions before he can feel at ease and secure.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Stubborn but ineffectual demand for esteem.',
      ar: '[AR]',
    },
  },
  {
    primary: 2,
    secondary: 7,
    colorPairName: { en: 'Green / Black', ar: '[AR]' },
    frequency: '1.7%',
    asterisks: 1,
    physiological: {
      en: 'Frustration at unacceptable restrictions on his freedom of action is producing stress (especially in 7th & 8th positions; materially less in 6th & 7th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Seeks independence and freedom from any restriction and therefore avoids obligations or anything which might prove hampering. He is being subjected to considerable pressure and wants to escape from it so that he can obtain what he needs, but tends to lack the necessary strength of purpose to succeed in this.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Frustrated desire for independence and freedom of action.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  -3  Red combinations                                              */
  /* ------------------------------------------------------------------ */
  {
    primary: 3,
    secondary: 3,
    colorPairName: { en: 'Red / Red', ar: '[AR]' },
    frequency: '3.4%',
    asterisks: 2,
    physiological: {
      en: 'Suppressed and pent-up agitation resulting from the attempt to resist any additional stimulation, leading to irritability, angry outbursts or even sexual neuroses. There is a possibility of cardiac trouble. (Especially significant in 8th position, but still present in 6th position.)',
      ar: '[AR]',
    },
    psychological: {
      en: 'The situation is regarded as threatening and dangerous. Outraged by the thought that he will be unable to achieve his goals and distressed at the feeling of helplessness to remedy this. Over-extended and feels beset, possibly to the point of nervous prostration.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Helplessness.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 0,
    colorPairName: { en: 'Red / Grey', ar: '[AR]' },
    frequency: '0.8%',
    asterisks: 2,
    physiological: {
      en: 'Suppressed agitation resulting from the attempt to resist any additional stimulation. Impatient, erratic and irritable, with the possibility of hypertension or other cardiac trouble. (Especially in 7th & 8th positions, but also, to a lesser extent in 6th & 7th positions.)',
      ar: '[AR]',
    },
    psychological: {
      en: 'The situation is regarded as threatening and dangerous. Resentful that what he has striven so hard for is being menaced, and desperate because he feels powerless to prevent it--fears that he is going to miss out altogether. Unable to view the situation objectively, but extremely agitated and cannot rest in his attempts to remove this threat to his desires. Over-extended and feels beset, possibly to the point of nervous prostration.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Desperate agitation.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 1,
    colorPairName: { en: 'Red / Blue', ar: '[AR]' },
    frequency: '0.2%',
    asterisks: 3,
    physiological: {
      en: 'Suppressed agitation resulting from the attempt to resist any additional stimulation combined with the inability to relax cause him to drive himself beyond the capacity of his resources. Impatient, irritable and hectic, with the possibility of hypertension or other cardiac trouble.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Distressed by the unsatisfactory state of some close association. Feels unable to do anything to restore affinity and mutual trust, and considers that he is tied down in an unhappy situation from which he cannot escape.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Distress resulting from disharmony.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 2,
    colorPairName: { en: 'Red / Green', ar: '[AR]' },
    frequency: '0.1%',
    asterisks: 3,
    physiological: {
      en: 'Agitated helplessness and inability to control events are subjecting him to great stress. Possibility of cardiac trouble and/or muscular spasm.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Acutely distressed by what appears as a hostile environment. Feels he is being subjected to intolerable pressure and driven against his will. Rebellious and resentful at what he considers unreasonable demands on him, but feels powerless to control the situation or protect himself in any way.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Helpless resentment.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 4,
    colorPairName: { en: 'Red / Yellow', ar: '[AR]' },
    frequency: '1.5%',
    asterisks: 3,
    physiological: {
      en: 'Stresses resulting from disappointment have led to agitation and anxiety.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Eager to make a good impression, but worried and doubtful about the likelihood of succeeding. Feels that he has a right to anything he might hope for, and becomes helpless and distressed when circumstances go against him. Finds the mere possibility of failure most upsetting and this can even lead to nervous prostration. Sees himself as a "victim" who has been misled and abused, mistakes this dramatization for reality and tries to convince himself that his failure to achieve standing and recognition is the fault of others.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Unrealistic self-justification.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 5,
    colorPairName: { en: 'Red / Violet', ar: '[AR]' },
    frequency: '0.8%',
    asterisks: 2,
    physiological: {
      en: 'Stress resulting from frustration in his attempts to achieve security and understanding (especially in 7th & 8th positions; materially less in 6th & 7th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Is responsive to outside stimuli and wants to experience everything intensely, but is finding the existing situation extremely frustrating. Needs sympathetic understanding and a sense of security. Distressed by his apparent powerlessness to achieve his goals.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Frustrated empathy.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 6,
    colorPairName: { en: 'Red / Brown', ar: '[AR]' },
    frequency: '0.7%',
    asterisks: 1,
    physiological: {
      en: 'Tension arising from nervous prostration or from sexual stress, due to excessive self-restraint. (In 7th & 8th positions; minor in 6th & 7th.)',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels unappreciated and finds the existing situation disagreeable. Wants personal recognition and the esteem of others to compensate for the lack of like-minded people with whom to ally himself and make himself more secure. His sensual self-restraint makes it difficult for him to give himself, but the resulting isolation leads to the urge to surrender and merge with another. This disturbs him as he regards such instincts as weaknesses to be overcome; only by not succumbing to them, he feels, can he withstand the difficulties of the situation. Wants to be valued as a desirable associate and admired for his personal qualities.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Insecurity arising from lack of allies.',
      ar: '[AR]',
    },
  },
  {
    primary: 3,
    secondary: 7,
    colorPairName: { en: 'Red / Black', ar: '[AR]' },
    frequency: '0.9%',
    asterisks: 1,
    physiological: {
      en: 'Stress arising from the frustrations of an unwanted situation (mainly in 7th & 8th positions; less so in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels trapped in a disagreeable situation and powerless to remedy it. Angry and disgruntled as he doubts that he will be able to achieve his goals and frustrated almost to the point of nervous prostration. Wants to get away, feel less restricted and free to make his own decisions.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Frustrated desire for independence.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  -4  Yellow combinations                                           */
  /* ------------------------------------------------------------------ */
  {
    primary: 4,
    secondary: 4,
    colorPairName: { en: 'Yellow / Yellow', ar: '[AR]' },
    frequency: '8.6%',
    asterisks: 2,
    physiological: {
      en: 'Stresses resulting from disappointment have led to agitation (especially in 8th position; far less so in 6th position).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Unfulfilled hopes have led to uncertainty and apprehension. Needs to feel secure and to avoid any further disappointment, and fears being passed over or losing standing and prestige. Doubts that things will be any better in the future and this negative attitude leads him to make exaggerated demands and to refuse to make reasonable compromises.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Agitated pessimism; fearful of losing prestige.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 0,
    colorPairName: { en: 'Yellow / Grey', ar: '[AR]' },
    frequency: '2.1%',
    asterisks: 1,
    physiological: {
      en: 'Uncertainty and worry over missing opportunities have led to a condition of agitated tension (especially in 7th & 8th positions; materially less in 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels that life must yield more than it is and that his hopes and desires must somehow be realized--that they must be granted in their entirety. The existing uncertainty causes considerable worry and he is tensely on his guard against missing any opportunity. Anxious to avoid further setbacks, any loss of standing or prestige. Tries to make sure that he will not be overlooked and badly needs security.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Tensely expectant.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 1,
    colorPairName: { en: 'Yellow / Blue', ar: '[AR]' },
    frequency: '0.2%',
    asterisks: 3,
    physiological: {
      en: 'Stress and anxiety have resulted from emotional disappointment (especially in 7th & 8th positions, but also in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'An emotional relationship is no longer running smoothly, has proved deeply disappointing and is now regarded as a depressing tie. While on the one hand, he would like to free himself from this attachment altogether, yet, on the other, he does not want to lose anything nor risk uncertainty and the possibility of further disappointment. These contradictory emotions aggravate him to such an extent that he tries to suppress them beneath an aloof and severe attitude.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Stress arising from emotional disappointment.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 2,
    colorPairName: { en: 'Yellow / Green', ar: '[AR]' },
    frequency: '0.2%',
    asterisks: 3,
    physiological: {
      en: 'Stress and anxiety due to conflict between hope and necessity, following acute disappointment.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Disappointment and unfulfilled hopes have given rise to an anxious uncertainty, while doubts that things will be any better in the future lead to the postponement of essential decisions. This conflict between hope and necessity is creating considerable pressure. Instead of resolving this by facing up to making the essential decision, he is likely to immerse himself in the pursuit of trivialities as an escape route.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Frustrated vacillation.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 3,
    colorPairName: { en: 'Yellow / Red', ar: '[AR]' },
    frequency: '0.9%',
    asterisks: 3,
    physiological: {
      en: 'Stresses resulting from disappointment have led to agitation and anxiety.',
      ar: '[AR]',
    },
    psychological: {
      en: 'Eager to make a good impression, but worried and doubtful about the likelihood of succeeding. Feels that he has a right to anything he might hope for, and becomes helpless and distressed when circumstances go against him. Finds the mere possibility of failure most upsetting and this can even lead to nervous prostration. Sees himself as a "victim" who has been misled and abused, mistakes this dramatization for reality and tries to convince himself that his failure to achieve standing and recognition is the fault of others.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Unrealistic self-justification.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 5,
    colorPairName: { en: 'Yellow / Violet', ar: '[AR]' },
    frequency: '1.2%',
    asterisks: 1,
    physiological: {
      en: 'Disappointment had led to a suspicious, restrained withdrawal from others and into himself (in 7th & 8th positions; far less in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Suppresses his innate enthusiasm and imaginative nature, for fear that he might be carried away by it only to find himself pursuing some will-o\'-the-wisp. Feels he has been misled and abused and has withdrawn to hold himself cautiously aloof from others. Keeps a careful and critical watch to see whether motives towards him are sincere--a watchfulness which easily develops into suspicion and distrust.',
      ar: '[AR]',
    },
    inBrief: {
      en: '"Once bitten, twice shy"; emotional disappointment leading to watchful mistrust of motive.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 6,
    colorPairName: { en: 'Yellow / Brown', ar: '[AR]' },
    frequency: '1.1%',
    asterisks: 1,
    physiological: {
      en: 'Stress resulting from the effort to conceal worry and anxiety under a cloak of self-reliance and unconcern (mainly in 7th & 8th positions; far less in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'The existing situation is disagreeable. Feels lonely and uncertain as he has an unsatisfied need to ally himself with others whose standards are as high as his own, and wants to stand out from the rank and file. This sense of isolation magnifies his need into a compelling urge, all the more upsetting to his self-sufficiency because of the restraint he normally imposes on himself. Since he wants to demonstrate the unique quality of his own character, he tries to suppress this need for others, and affects an attitude of unconcerned self-reliance to conceal his fear of inadequacy, treating those who criticize his behavior with contempt. However, beneath this assumption of indifference he really longs for the approval and esteem of others.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Disappointment leading to assumed indifference.',
      ar: '[AR]',
    },
  },
  {
    primary: 4,
    secondary: 7,
    colorPairName: { en: 'Yellow / Black', ar: '[AR]' },
    frequency: '3.4%',
    asterisks: 1,
    physiological: {
      en: 'Stress resulting from disappointment and watchful self-protection against further setback (mainly in 7th & 8th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Unfulfilled hopes have led to uncertainty and a tense watchfulness. Insists on freedom of action and resents any form of control other than that which is self-imposed. Unwilling to go without or to relinquish anything and demands security as a protection against any further setback or loss of position and prestige. Doubts that things will be any better in the future and this negative attitude leads him to exaggerate his claims and to refuse reasonable compromises.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Watchful and retentive.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  -5  Violet combinations                                           */
  /* ------------------------------------------------------------------ */
  {
    primary: 5,
    secondary: 5,
    colorPairName: { en: 'Violet / Violet', ar: '[AR]' },
    frequency: '11.0%',
    asterisks: 0,
    physiological: {
      en: 'Stress due to suppressed sensitivity (in 8th position only; mild if not classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Delights in the tasteful, the gracious and the sensitive, but maintains his attitude of critical appraisal and refuses to be swept off his feet unless genuineness and integrity can be absolutely vouched for. Therefore keeps a strict and watchful control on his emotional relationships as he must know exactly where he stands. Demands complete sincerity as a protection against his own tendency to be too trusting.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Controlled and analytical responsiveness.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 0,
    colorPairName: { en: 'Violet / Grey', ar: '[AR]' },
    frequency: '1.7%',
    asterisks: 0,
    physiological: {
      en: 'Displays impatience and agitation (in 7th & 8th positions only; mild if not classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels that life has far more to offer and that it is imperative that he should find the responsive and understanding relationship he is seeking; he therefore follows up any opportunity which presents itself. However, he maintains his attitude of critical appraisal and refuses to be swept off his feet unless genuineness and integrity can be absolutely vouched for. Therefore keeps a strict and watchful control on his emotional relationships as he must know exactly where he stands. Demands complete sincerity as a protection against his own tendency to be too trusting.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Controlled responsiveness.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 1,
    colorPairName: { en: 'Violet / Blue', ar: '[AR]' },
    frequency: '0.9%',
    asterisks: 1,
    physiological: {
      en: 'Refuses to relax or give in. Holding exhaustion and depression at bay by keeping active (especially in 7th & 8th positions; rather less in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'An existing relationship is unsatisfactory but he feels unable to change it without co-operation; the need for understanding, for affectionate give-and-take remains unfulfilled. This not only depresses him but makes him irritable and impatient, producing restlessness and the urge to get away from the situation, either actually or, at least, mentally. Ability to concentrate may suffer.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Restlessness due to emotional dissatisfaction.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 2,
    colorPairName: { en: 'Violet / Green', ar: '[AR]' },
    frequency: '0.5%',
    asterisks: 1,
    physiological: {
      en: 'Stress resulting from the feeling of belittlement and misunderstanding (especially in 7th & 8th positions; slightly less in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels in an invidious position, that trust, affection and understanding are being withheld and that he is being treated with a humiliating lack of consideration. Considers he is being denied the appreciation essential to his self-esteem and that there is nothing he can do about it. Disheartened by the lone struggle against difficulties with no encouragement. Feels he is getting nowhere; that, instead of the admiration he needs, he is consistently misunderstood. Wants to escape from the situation but cannot find the strength of mind to make the necessary decision.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Humiliated by lack of appreciation.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 3,
    colorPairName: { en: 'Violet / Red', ar: '[AR]' },
    frequency: '0.3%',
    asterisks: 2,
    physiological: {
      en: 'Stress resulting from frustration in his attempts to achieve security and understanding. Nervous strength can become seriously depleted and there is a possibility of cardiac trouble (especially in 7th & 8th positions; slightly less in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Is responsive to outside stimuli and wants to experience everything intensely, but is finding the existing situation extremely frustrating. Needs sympathetic understanding and a sense of security. Distressed by his apparent powerlessness to achieve his goals.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Emotional and empathic frustration.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 4,
    colorPairName: { en: 'Violet / Yellow', ar: '[AR]' },
    frequency: '0.9%',
    asterisks: 1,
    physiological: {
      en: 'Disappointment has led to a suspicious and restrained withdrawal from others and into himself (especially in 7th & 8th positions; less in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Suppresses his innate enthusiasm and imaginative nature, for fear he might be carried away by it only to find himself pursuing some will-o\'-the-wisp. Feels he has been misled and abused and has withdrawn to hold himself cautiously aloof from others. Keeps a careful and critical watch to see whether motives towards him are sincere--a watchfulness which easily develops into suspicion and distrust.',
      ar: '[AR]',
    },
    inBrief: {
      en: '"Once bitten, twice shy"; emotional disappointment, leading to watchful mistrust of motive.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 6,
    colorPairName: { en: 'Violet / Brown', ar: '[AR]' },
    frequency: '1.0%',
    asterisks: 0,
    physiological: {
      en: 'Stress arising from the inability to maintain relationships stably in their desired condition (in 7th & 8th positions only; mild if not classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Wants a partner with whom he can share fully in an atmosphere of cloudless serenity, but his compulsion to demonstrate his individuality leads him to adopt a critical and demanding attitude. This introduces discord and leads to alternating periods of drawing closer and drawing apart, so that the ideal state he desires is not allowed to develop. Despite the urge to gratify his natural desires, he imposes a considerable self-restraint on his instincts in the belief that this demonstrates his superiority and raises him above the common herd. Discerning, critical and particular, having taste and discrimination. These qualities, combined with his tendency to form his own views, enable him to judge things for himself and to express his opinions with authority. He enjoys the original, the ingenious and the subtle, striving to ally himself with others of similar taste who can help him in his intellectual unfolding. Desires admiration and the esteem of others.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Intellectual or esthetic discrimination.',
      ar: '[AR]',
    },
  },
  {
    primary: 5,
    secondary: 7,
    colorPairName: { en: 'Violet / Black', ar: '[AR]' },
    frequency: '3.6%',
    asterisks: 0,
    physiological: {
      en: 'Stress resulting from unwelcome restriction or limitation (only if classed as an "anxiety" in 7th & 8th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Strives for straight-forward relationships, founded on mutual trust and understanding. Wishes to act only in conformity with his own convictions. Demands freedom to make his own decisions without being subjected to interference, outside influence or the necessity of making compromises.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Demands independence and "straight dealing."',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  -6  Brown combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 6,
    secondary: 6,
    colorPairName: { en: 'Brown / Brown', ar: '[AR]' },
    frequency: '11.4%',
    asterisks: 0,
    physiological: {
      en: 'Stress arising from suppression of physical or sexual desires and insufficient consideration for bodily needs (in 8th position only and especially if classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Has an unsatisfied need to ally himself with others whose standards are as high as his own, and to stand out from the common herd. This desire for pre-eminence isolates him and inhibits his readiness to give himself freely. While he wants to surrender and let himself go, he regards this as a weakness which must be resisted. This self-restraint, he feels, will lift him above the rank and file and ensure recognition as a unique and distinctive personality.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Demands esteem from others.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 0,
    colorPairName: { en: 'Brown / Grey', ar: '[AR]' },
    frequency: '5.8%',
    asterisks: 0,
    physiological: {
      en: 'Stress arising from suppression of physical or sexual desires and insufficient consideration for bodily needs (in 7th & 8th positions only and especially if classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'The existing situation is disagreeable. Has an unsatisfied need to ally himself with others whose standards are as high as his own, and to stand out from the common herd. His control of his sensual instincts restricts his ability to give himself, but the resulting isolation leads to the urge to surrender and allow himself to merge with another. This disturbs him, as such instincts are regarded as weaknesses to be overcome; he feels that only by continued self-restraint can he hope to maintain his attitude of individual superiority. Wants to be loved or admired for himself alone; needs attention, recognition and the esteem of others.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Demands esteem as an exceptional individual.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 1,
    colorPairName: { en: 'Brown / Blue', ar: '[AR]' },
    frequency: '0.5%',
    asterisks: 1,
    physiological: {
      en: 'Emotional discontent and lack of appreciation have led to stress and excessive self-restraint (in 7th & 8th positions; less pronounced in 6th & 7th positions).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels he must have co-operation before the existing situation can be improved. Lack of understanding and appreciation makes him feel no real bond exists, and discontent gives rise to a touchy sensitivity; he wants to feel safer and more at ease. He would like to get away from what he now considers a depressing tie and re-establish his own individuality. His sensual self-restraint makes it difficult for him to give himself, but the resulting isolation leads to the urge to surrender and merge with another. This disturbs him, as he regards such instincts as weaknesses to be overcome; he feels that he can only assert his own individuality by continued self-restraint, that this alone will allow him to stand his ground through his present difficulties.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Emotional discontent arising from lack of appreciation and undue self-restraint.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 2,
    colorPairName: { en: 'Brown / Green', ar: '[AR]' },
    frequency: '0.2%',
    asterisks: 1,
    physiological: {
      en: 'Stress resulting from excessive self-restraint in the attempt to win the regard and esteem of others (especially in 7th & 8th positions; less pronounced, but still significant, in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Has an unsatisfied need to ally himself with others whose standards are as high as his own, and to stand out from the rank and file. This subjects him to considerable stress, but he sticks to his attitudes despite lack of appreciation. Finds the situation uncomfortable and would like to break away from it, but refuses to compromise with his opinions. Unable to resolve the situation because he continually postpones making the necessary decision, as he doubts his ability to withstand the opposition which would result. Needs the esteem of others, compliance with his wishes and respect for his opinions before he can feel at ease and secure.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Stubborn but ineffectual demand for esteem.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 3,
    colorPairName: { en: 'Brown / Red', ar: '[AR]' },
    frequency: '0.6%',
    asterisks: 2,
    physiological: {
      en: 'Stress arising from suppression of physical or sexual desires and insufficient consideration of bodily needs (especially in 7th & 8th positions; slightly less acute in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels unappreciated and finds the existing situation threatening. Wants personal recognition and the esteem of others to compensate for the lack of like-minded people with whom to ally himself and make himself more secure. His sensual self-restraint makes it difficult for him to give himself, but the resulting isolation leads to the urge to surrender and merge with another. This disturbs him, as he regards such instincts as weaknesses to be overcome; he feels that only in this way can he withstand the difficulties of the situation. Wants to be valued as a desirable associate and be admired for his personal qualities.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Insecurity arising from lack of allies.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 4,
    colorPairName: { en: 'Brown / Yellow', ar: '[AR]' },
    frequency: '1.3%',
    asterisks: 1,
    physiological: {
      en: 'Stress resulting from the effort to conceal worry and anxiety under a cloak of self-reliance and unconcern (especially in 7th & 8th positions; less pronounced, but still significant, in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'The existing situation is disagreeable. Feels lonely and uncertain as he has an unsatisfied need to ally himself with others whose standards are as high as his own and to stand out from the rank and file. This sense of isolation magnifies his need into a compelling urge, all the more upsetting to his self-sufficiency because of the restraint he normally imposes on himself. Since he wants to demonstrate the unique quality of his own character, he tries to suppress this need for others, and affects an attitude of unconcerned self-reliance to conceal his fear of inadequacy, treating those who criticize his behavior with contempt. However, beneath this assumption of indifference he really longs for the approval and esteem of others.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Disappointment leading to assumed indifference.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 5,
    colorPairName: { en: 'Brown / Violet', ar: '[AR]' },
    frequency: '1.5%',
    asterisks: 0,
    physiological: {
      en: 'Stress arising from the inability to maintain relationships stably in their desired condition (in 7th & 8th positions only; mild if not classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Sensitive, and susceptible to gentleness and delicacy of feeling, with a desire to blend into some sort of mystic fusion of erotic harmony. However, this desire remains unsatisfied due to the lack of a suitable partner or adverse conditions, and he keeps a strict and watchful control on his emotional relationships as he needs to know precisely where he stands. Is fastidious, esthetic and has a cultured taste which allows him to form and express his own taste and judgment, especially in the fields of art and artistic creativity. Strives to ally with others who can assist him in his intellectual or artistic growth.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Sublimated artistic sensitivity.',
      ar: '[AR]',
    },
  },
  {
    primary: 6,
    secondary: 7,
    colorPairName: { en: 'Brown / Black', ar: '[AR]' },
    frequency: '5.3%',
    asterisks: 0,
    physiological: {
      en: 'Stress resulting from unwelcome restriction or limitation (only significant if classed as an "anxiety" in 7th & 8th positions; otherwise implies only the normal desire for independence).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Wants freedom to follow his own convictions and principles, to achieve respect as an individual in his own right. Desires to avail himself of every possible opportunity without having to submit to limitations or restrictions.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Desire to control one\'s own destiny.',
      ar: '[AR]',
    },
  },

  /* ------------------------------------------------------------------ */
  /*  -7  Black combinations                                            */
  /* ------------------------------------------------------------------ */
  {
    primary: 7,
    secondary: 7,
    colorPairName: { en: 'Black / Black', ar: '[AR]' },
    frequency: '35.1%',
    asterisks: 0,
    physiological: {
      en: 'Stress arising from intensity (of feeling, endeavor, etc., as shown by the other colors). (Only of special significance if classed as an "anxiety" in 8th position; otherwise normal.)',
      ar: '[AR]',
    },
    psychological: {
      en: 'Wishes to be independent, unhampered and free from any limitation or restriction, other than those which he imposes on himself by his own choice and decision.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Desire to control one\'s own destiny.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 0,
    colorPairName: { en: 'Black / Grey', ar: '[AR]' },
    frequency: '10.5%',
    asterisks: 0,
    physiological: {
      en: 'Pronounced susceptibility to outside stimuli (in 7th & 8th positions, but mainly if classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Wants to overcome a feeling of emptiness and of separation from others. Believes that life still has far more to offer and that he may miss his share of experiences if he fails to make the best use of every opportunity. He therefore pursues his objectives with a fierce intensity and commits himself deeply and readily. Feels himself to be completely competent in any field in which he engages, and can sometimes be considered by others to be interfering or meddlesome.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Intense involvement.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 1,
    colorPairName: { en: 'Black / Blue', ar: '[AR]' },
    frequency: '1.7%',
    asterisks: 1,
    physiological: {
      en: 'Emotional dissatisfaction has given rise to a touchy and impatient desire for independence, leading to stress and restlessness (especially in 7th & 8th positions, but also in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'An existing situation or relationship is unsatisfactory, but he feels unable to improve it without willing co-operation. Unwilling to expose his vulnerability and therefore considers it inadvisable to display affection or be over-demonstrative. He regards the relationship as a depressing tie, but although he wants to be independent and unhampered, he does not want to risk losing anything. All this leads him to react touchily and with impatience, while the urge to get away results in considerable restlessness. The ability to concentrate may suffer.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Restless instability arising from emotional dissatisfaction.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 2,
    colorPairName: { en: 'Black / Green', ar: '[AR]' },
    frequency: '0.8%',
    asterisks: 1,
    physiological: {
      en: 'Frustration at unacceptable restrictions on his freedom of action is producing stress (especially in 7th & 8th positions, but also in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Seeks independence and freedom from any restriction and therefore avoids obligations or anything which might prove hampering. He is being subjected to considerable pressure and wants to escape from it so that he can obtain what he needs, but tends to lack the necessary strength of purpose to succeed in this.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Frustrated desire for independence and freedom of action.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 3,
    colorPairName: { en: 'Black / Red', ar: '[AR]' },
    frequency: '0.7%',
    asterisks: 2,
    physiological: {
      en: 'Stress arising from the frustrations of an unwanted situation (especially in 7th & 8th positions, but also in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Feels trapped in a disagreeable situation and powerless to remedy it. Angry and disgruntled as he doubts that he will be able to achieve his goals, and frustrated almost to the point of nervous prostration. Wants to get away, to feel less restricted and be free to make his own decisions.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Frustrated desire for independence.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 4,
    colorPairName: { en: 'Black / Yellow', ar: '[AR]' },
    frequency: '2.5%',
    asterisks: 1,
    physiological: {
      en: 'Stress resulting from disappointment and watchful self-protection against further setback (especially in 7th & 8th positions, but also in 6th & 7th).',
      ar: '[AR]',
    },
    psychological: {
      en: 'Unfulfilled hopes have led to uncertainty and a tense watchfulness. Insists on freedom of action and resents any form of control other than that which is self-imposed. Unwilling to go without or to relinquish anything, and demands security as a protection against any further setback or loss of position and prestige. Doubts that things will be any better in the future, and this negative attitude leads him to exaggerate his claims and to refuse reasonable compromises.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Watchful and retentive.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 5,
    colorPairName: { en: 'Black / Violet', ar: '[AR]' },
    frequency: '3.0%',
    asterisks: 0,
    physiological: {
      en: 'Stress resulting from unwelcome restriction or limitation (in 7th & 8th positions, but mainly if classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Sensitive and impressionable, prone to absorbing enthusiasms. Seeks an idealized--but so far unfulfilled--situation in which he can share with another a complete accord and mutual depth of understanding. Feels there is a risk of being exploited if he is too ready to trust others and therefore demands proof of their sincerity. Needs to know exactly where he stands in his relationships.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Demand for shared independence.',
      ar: '[AR]',
    },
  },
  {
    primary: 7,
    secondary: 6,
    colorPairName: { en: 'Black / Brown', ar: '[AR]' },
    frequency: '3.5%',
    asterisks: 0,
    physiological: {
      en: 'Stress resulting from unwelcome restriction or limitation (in 7th & 8th positions, but mainly if classed as an "anxiety").',
      ar: '[AR]',
    },
    psychological: {
      en: 'Resists any form of pressure from others and insists on his independence as an individual. Wants to make up his own mind without interference, to draw his own conclusions and arrive at his own decisions. Detests uniformity and mediocrity. As he wants to be regarded as one who gives authoritative opinions, he finds it difficult to admit to being wrong, while at times he is reluctant to accept or understand another\'s point of view.',
      ar: '[AR]',
    },
    inBrief: {
      en: 'Demand for independence and perfectionism.',
      ar: '[AR]',
    },
  },
] as const;

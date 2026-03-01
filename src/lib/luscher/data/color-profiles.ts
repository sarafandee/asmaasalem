/**
 * Chapter 6: The Meaning of the Eight Colors (p.51-70)
 *
 * Each color's psychological profile distilled into structured data
 * for use in the enhanced report's "Individual Color Notes" section.
 */

import type { ColorId } from '../types';

export interface ColorProfile {
  id: ColorId;
  /** Core psychological meaning */
  essence: { en: string; ar: string };
  /** Meaning when in positions 0-1 (preferred/favored) */
  preferred: { en: string; ar: string };
  /** Meaning when in positions 6-7 (rejected/suppressed) */
  rejected: { en: string; ar: string };
  /** Normal/average position for this color (1-indexed, as in book) */
  averagePosition: number;
  /** Associated organ system */
  organ?: { en: string; ar: string };
  /** Core emotional correspondence */
  emotional?: { en: string; ar: string };
  /** Sensory quality */
  sensory?: { en: string; ar: string };
}

export const COLOR_PROFILES: Record<ColorId, ColorProfile> = {
  // Grey (0) — p.52-54
  0: {
    id: 0,
    essence: {
      en: 'Non-involvement and concealment. Grey is neutral — neither subject nor object, neither tension nor relaxation. It is a border, a "no-man\'s-land" partitioning contrasting areas.',
      ar: 'عدم المشاركة والتستر. الرمادي محايد — لا موضوع ولا ذات، لا توتر ولا استرخاء. إنه حد فاصل، "أرض حرام" تفصل بين المناطق المتباينة.',
    },
    preferred: {
      en: 'Wants to wall everything off, remain uncommitted and uninvolved. Shields from outside influence by dealing mechanically and artificially with what must be done. A strong element of concealment and self-deception.',
      ar: 'يريد عزل كل شيء، والبقاء غير ملتزم وغير منخرط. يحمي نفسه من التأثير الخارجي بالتعامل الآلي والمصطنع مع ما يجب القيام به. عنصر قوي من التستر وخداع الذات.',
    },
    rejected: {
      en: 'Commits fully to things, wants to be stimulated and engaged. Refuses to be passed over and wants to exhaust every possibility on the way to a goal.',
      ar: 'يلتزم بالأشياء بالكامل، يريد أن يكون متحمسًا ومنخرطًا. يرفض أن يُتجاهل ويريد استنفاد كل الإمكانيات في طريقه نحو الهدف.',
    },
    averagePosition: 6,
  },

  // Dark Blue (1) — p.54-57
  1: {
    id: 1,
    essence: {
      en: 'Depth, tranquility, and contentment. Blue represents the need for emotional calm, peace, harmony, and belonging. It has a pacifying effect on the central nervous system.',
      ar: 'العمق والهدوء والرضا. يمثل الأزرق الحاجة للهدوء العاطفي والسلام والانسجام والانتماء. له تأثير مهدئ على الجهاز العصبي المركزي.',
    },
    preferred: {
      en: 'Needs emotional tranquility, peace, harmony and contentment. Wants a calm and orderly environment free from disturbance, where relationships are placid and free from contention.',
      ar: 'يحتاج إلى الهدوء العاطفي والسلام والانسجام والرضا. يريد بيئة هادئة ومنظمة خالية من الاضطراب، حيث تكون العلاقات هادئة وخالية من الخلافات.',
    },
    rejected: {
      en: 'Existing emotional relationships or professional associations are being rejected because they do not meet high standards. Finds them burdensome, disheartening and oppressive — a tie from which escape is desired.',
      ar: 'يتم رفض العلاقات العاطفية أو المهنية القائمة لأنها لا تلبي المعايير العالية. يجدها مرهقة ومثبطة وقمعية — رابطة يُرغب في الهروب منها.',
    },
    averagePosition: 4,
    organ: { en: 'Skin', ar: 'الجلد' },
    emotional: { en: 'Tenderness', ar: 'الحنان' },
    sensory: { en: 'Sweetness', ar: 'الحلاوة' },
  },

  // Blue-Green (2) — p.57-60
  2: {
    id: 2,
    essence: {
      en: 'Elastic tension, will, perseverance, and self-assertion. Green represents the need for recognition, constancy of viewpoint, and self-esteem. It acts as a dam behind which the excitation of external stimuli builds up.',
      ar: 'التوتر المرن والإرادة والمثابرة وتأكيد الذات. يمثل الأخضر الحاجة للاعتراف وثبات وجهة النظر واحترام الذات. يعمل كسد يتراكم خلفه إثارة المحفزات الخارجية.',
    },
    preferred: {
      en: 'Wants to be recognized, to impress, to hold his own way against opposition and resistance. Needs to increase certainty in his own value, either by self-assertiveness or by acknowledgment from others.',
      ar: 'يريد أن يُعترف به، أن يثير الإعجاب، أن يتمسك بطريقه ضد المعارضة والمقاومة. يحتاج لزيادة اليقين في قيمته الذاتية، إما بتأكيد الذات أو بالاعتراف من الآخرين.',
    },
    rejected: {
      en: 'Anxiety from non-recognition and loss of standing. Feels weakened by resistance and reduced in stature. Leads to tension, distress, and possibly physical pressure such as chest or heart complaints.',
      ar: 'قلق من عدم الاعتراف وفقدان المكانة. يشعر بالضعف من المقاومة وانخفاض القامة. يؤدي إلى التوتر والضيق وربما ضغط جسدي مثل شكاوى الصدر أو القلب.',
    },
    averagePosition: 3,
    organ: { en: 'Smooth (involuntary) muscles', ar: 'العضلات الملساء (اللاإرادية)' },
    emotional: { en: 'Pride', ar: 'الكبرياء' },
    sensory: { en: 'Astringency', ar: 'القبض' },
  },

  // Orange-Red (3) — p.60-62
  3: {
    id: 3,
    essence: {
      en: 'Force, vitality, desire, appetite, and conquest. Red represents the impulse towards active doing, sport, struggle, competition, productivity and enterprise. It is the "impact of the will" or "force of will."',
      ar: 'القوة والحيوية والرغبة والشهية والفتح. يمثل الأحمر الدافع نحو العمل النشط والرياضة والنضال والمنافسة والإنتاجية والمبادرة. إنه "تأثير الإرادة" أو "قوة الإرادة".',
    },
    preferred: {
      en: 'Wants intensity of experience and fullness of living. Activities may include enterprise, leadership, creative endeavor, development, expansion, and the sensual pursuit of physical appetite.',
      ar: 'يريد شدة التجربة وامتلاء الحياة. قد تشمل الأنشطة المبادرة والقيادة والمساعي الإبداعية والتطوير والتوسع والسعي الحسي للشهية الجسدية.',
    },
    rejected: {
      en: 'Already in a state of over-stimulation. Feels his environment is dangerous and out of control. Seeks protection from anything which might excite, aggravate or weaken further.',
      ar: 'في حالة فرط التحفيز بالفعل. يشعر بأن بيئته خطيرة وخارجة عن السيطرة. يبحث عن الحماية من أي شيء قد يثير أو يفاقم أو يضعف أكثر.',
    },
    averagePosition: 2,
    organ: { en: 'Striated (voluntary) muscles, sympathetic nervous system', ar: 'العضلات المخططة (الإرادية)، الجهاز العصبي الودي' },
    emotional: { en: 'Desire, appetite', ar: 'الرغبة، الشهية' },
    sensory: { en: 'Appetite', ar: 'الشهية' },
  },

  // Bright Yellow (4) — p.63-65
  4: {
    id: 4,
    essence: {
      en: 'Brightness, cheerfulness, hope, release from burdens and restrictions. Yellow expresses uninhibited expansiveness, a loosening or relaxation. It is the desire for release and the search for greater happiness.',
      ar: 'الإشراق والبهجة والأمل والتحرر من الأعباء والقيود. يعبر الأصفر عن التوسع غير المقيد، الارتخاء أو الاسترخاء. إنه الرغبة في التحرر والبحث عن سعادة أكبر.',
    },
    preferred: {
      en: 'Shows the desire for release and the hope or expectation of greater happiness. Implies some minor or major conflict from which release is needed. Directed towards the future, the new, the modern, and the developing.',
      ar: 'يُظهر الرغبة في التحرر والأمل أو التوقع بسعادة أكبر. يتضمن بعض الصراع البسيط أو الكبير الذي يحتاج إلى تحرر منه. موجه نحو المستقبل والجديد والحديث والمتطور.',
    },
    rejected: {
      en: 'Hopes have been disappointed. Confronting emptiness and feels isolated or cut off from others. Turmoil from disappointment and the feeling that hopes are not going to be realized. May take the form of irritability, discouragement or mistrust.',
      ar: 'خيبة الآمال. مواجهة الفراغ والشعور بالعزلة أو الانقطاع عن الآخرين. اضطراب من خيبة الأمل والشعور بأن الآمال لن تتحقق. قد يتخذ شكل التهيج أو الإحباط أو عدم الثقة.',
    },
    averagePosition: 5,
    organ: { en: 'Sympathetic and parasympathetic nervous systems', ar: 'الجهاز العصبي الودي واللاودي' },
    emotional: { en: 'Piquancy, hopefulness', ar: 'الحدة، التفاؤل' },
    sensory: { en: 'Piquancy', ar: 'الحدة' },
  },

  // Violet (5) — p.65-67
  5: {
    id: 5,
    essence: {
      en: 'Identification, enchantment, and sensitive intimacy. Violet is a mixture of red and blue — the impulsive conquest of red unified with the gentle surrender of blue, becoming representative of "identification."',
      ar: 'التماهي والسحر والألفة الحساسة. البنفسجي مزيج من الأحمر والأزرق — الفتح الاندفاعي للأحمر متحد مع الاستسلام اللطيف للأزرق، ليصبح ممثلاً "للتماهي".',
    },
    preferred: {
      en: 'Wants to achieve a "magical" relationship, to charm and delight others, to exert fascination. Sensitive and appreciative but does not want excessive responsibility in relationships.',
      ar: 'يريد تحقيق علاقة "سحرية"، إسعاد الآخرين وإبهارهم، ممارسة الافتتان. حساس ومقدر لكن لا يريد مسؤولية مفرطة في العلاقات.',
    },
    rejected: {
      en: 'Critical reserve and unwillingness to commit deeply to any relationship until the responsibilities are clear. Need for identification projected onto objects rather than people, giving rise to esthetic appreciation.',
      ar: 'تحفظ نقدي وعدم الرغبة في الالتزام العميق بأي علاقة حتى تتضح المسؤوليات. الحاجة للتماهي تُسقط على الأشياء بدلاً من الأشخاص، مما يؤدي إلى التقدير الجمالي.',
    },
    averagePosition: 7,
  },

  // Brown (6) — p.67-69
  6: {
    id: 6,
    essence: {
      en: 'Sensation, bodily awareness, and physical ease or discomfort. Brown represents the sensuous, relating directly to the physical body. Its position indicates the body\'s sensory condition.',
      ar: 'الإحساس والوعي الجسدي والراحة أو عدم الراحة الجسدية. يمثل البني الحسي، ويتصل مباشرة بالجسم المادي. يشير موقعه إلى الحالة الحسية للجسم.',
    },
    preferred: {
      en: 'Increased need for physical ease, sensuous contentment, and security. May indicate a situation of insecurity, actual physical illness, or an atmosphere of conflict needing conditions to be ameliorated.',
      ar: 'حاجة متزايدة للراحة الجسدية والرضا الحسي والأمان. قد يشير إلى حالة عدم أمان، مرض جسدي فعلي، أو جو من الصراع يحتاج إلى تحسين الظروف.',
    },
    rejected: {
      en: 'Regards bodily needs and physical sensations as a weakness to be suppressed. Refuses to allow the body\'s comfort to be a primary concern.',
      ar: 'يعتبر الاحتياجات الجسدية والأحاسيس المادية ضعفًا يجب قمعه. يرفض السماح لراحة الجسم بأن تكون اهتمامًا أساسيًا.',
    },
    averagePosition: 7,
  },

  // Black (7) — p.69-70
  7: {
    id: 7,
    essence: {
      en: 'Nothingness, protest, revolt, and "the end." Black represents the absolute boundary, the negation of color. It is emphatic and forceful — the ultimate "No."',
      ar: 'العدم والاحتجاج والتمرد و"النهاية". يمثل الأسود الحد المطلق، نفي اللون. إنه حاسم وقوي — "لا" المطلقة.',
    },
    preferred: {
      en: 'In revolt against fate, against his lot in life. Acting hastily and irrationally in protest against existing conditions. Extreme and often inappropriate behavior expressing a rebellious rejection of circumstances.',
      ar: 'في تمرد ضد القدر، ضد نصيبه في الحياة. يتصرف بتسرع وبلا عقلانية احتجاجًا على الظروف القائمة. سلوك متطرف وغالبًا غير مناسب يعبر عن رفض متمرد للظروف.',
    },
    rejected: {
      en: 'This is the normal position for black — the renunciation of "nothing" is the complete acceptance of life. Very little significance when in the last position.',
      ar: 'هذا هو الموضع الطبيعي للأسود — التخلي عن "لا شيء" هو القبول الكامل للحياة. أهمية قليلة جدًا عندما يكون في الموضع الأخير.',
    },
    averagePosition: 8,
  },
};

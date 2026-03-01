'use client';

import { useMemo } from 'react';
import type { LuscherTestReport, DeepAnalysis as DeepAnalysisType } from '@/lib/luscher/types';
import { computeDeepAnalysis } from '@/lib/luscher/engine/deep-analysis';
import { ScoringProtocol } from './ScoringProtocol';
import { InterpretationCard } from './InterpretationCard';
import { ActualProblems } from './ActualProblems';
import { DeepAnalysis } from './DeepAnalysis';
import { NormalityBadge } from './NormalityBadge';
import { ColorProfileNote } from './ColorProfileNote';

interface ReportLabels {
  firstSelection: string;
  secondSelection: string;
  desiredObjective: string;
  existingSituation: string;
  restrainedCharacteristics: string;
  stressSources: string;
  actualProblem: string;
  prognosis: string;
  favorable: string;
  unfavorable: string;
  stable: string;
  anxietyMarkers: string;
  compensationMarkers: string;
  physiological: string;
  psychological: string;
  inBrief: string;
  printReport: string;
  scoringProtocol: string;
  compensation: string;
  anxiety: string;
  totalMarkers: string;
  actualProblems: {
    title: string;
    rank: string;
    compensationLabel: string;
    anxietyLabel: string;
    noProblems: string;
    mostSignificant: string;
  };
  deepAnalysis: {
    title: string;
    workGroup: {
      title: string;
      intact: string;
      fragmented: string;
      inAbeyance: string;
      exhaustibility: string;
      leadingColor: string;
      prestige: string;
      achievement: string;
      interest: string;
    };
    autonomic: {
      title: string;
      stable: string;
      unstable: string;
    };
    conflict: {
      title: string;
      detected: string;
      none: string;
    };
    ambivalence: {
      title: string;
      noAmbivalence: string;
      preferredToRejected: string;
      rejectedToPreferred: string;
    };
    comparison: {
      title: string;
      similarity: string;
      rigid: string;
      normal: string;
      volatile: string;
      movedForward: string;
      movedBackward: string;
    };
  };
  colorNotes: {
    title: string;
    position: string;
  };
  normality: {
    title: string;
    percentAbove: string;
    normal: string;
    elevated: string;
    high: string;
    veryHigh: string;
  };
}

interface ReportViewProps {
  report: LuscherTestReport;
  locale: string;
  labels: ReportLabels;
}

export function ReportView({ report, locale, labels }: ReportViewProps) {
  const analysis = report.secondSelection;
  const lang = locale === 'ar' ? 'ar' : 'en';

  const prognosisLabel = {
    favorable: labels.favorable,
    unfavorable: labels.unfavorable,
    stable: labels.stable,
  }[report.prognosis];

  const prognosisColor = {
    favorable: 'bg-green-50 text-green-700 border-green-200',
    unfavorable: 'bg-red-50 text-red-700 border-red-200',
    stable: 'bg-blue-50 text-blue-700 border-blue-200',
  }[report.prognosis];

  // Deep analysis: use from report if available, otherwise compute client-side
  const deep: DeepAnalysisType | undefined = useMemo(() => {
    if (report.deepAnalysis) return report.deepAnalysis;
    // Backward compatibility: compute for old reports that lack deepAnalysis
    return computeDeepAnalysis(report.firstSelection, report.secondSelection);
  }, [report]);

  return (
    <div className="space-y-8 print:space-y-6">
      {/* 1. Scoring Protocol */}
      <section>
        <h2 className="mb-3 text-base font-bold text-charcoal">{labels.scoringProtocol}</h2>
        <ScoringProtocol
          firstSelection={report.firstSelection}
          secondSelection={report.secondSelection}
          locale={locale}
          labels={{
            firstSelection: labels.firstSelection,
            secondSelection: labels.secondSelection,
            compensation: labels.compensation,
            anxiety: labels.anxiety,
            totalMarkers: labels.totalMarkers,
          }}
        />
      </section>

      {/* 2. Prognosis + Normality */}
      <section className={`rounded-2xl border p-6 ${prognosisColor}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold">{labels.prognosis}</h3>
            <p className="mt-1 text-lg font-bold">{prognosisLabel}</p>
          </div>
          <div className="text-end text-sm">
            <p>{labels.firstSelection}: {report.prognosisDetail.firstTotal}!</p>
            <p>{labels.secondSelection}: {report.prognosisDetail.secondTotal}!</p>
          </div>
        </div>
        {deep && (
          <div className="mt-4">
            <NormalityBadge
              totalExclamations={deep.normalityContext.totalExclamations}
              percentileAbove={deep.normalityContext.percentileAbove}
              severity={deep.normalityContext.severity}
              labels={labels.normality}
            />
            <p className="mt-2 text-sm opacity-80">
              {deep.normalityContext.assessment[lang]}
            </p>
          </div>
        )}
      </section>

      {/* 3. Five Functional Group Interpretations */}
      <section className="space-y-4">
        <InterpretationCard
          title={labels.desiredObjective}
          functionSymbol="+"
          primary={analysis.plus.pair.primary}
          secondary={analysis.plus.pair.secondary}
          text={analysis.plus.interpretation.text[lang]}
          asterisks={analysis.plus.interpretation.asterisks}
          locale={locale}
        />

        <InterpretationCard
          title={labels.existingSituation}
          functionSymbol={'\u00d7'}
          primary={analysis.multiply.pair.primary}
          secondary={analysis.multiply.pair.secondary}
          text={analysis.multiply.interpretation.text[lang]}
          asterisks={analysis.multiply.interpretation.asterisks}
          locale={locale}
        />

        <InterpretationCard
          title={labels.restrainedCharacteristics}
          functionSymbol="="
          primary={analysis.equal.pair.primary}
          secondary={analysis.equal.pair.secondary}
          text={analysis.equal.interpretation.text[lang]}
          asterisks={analysis.equal.interpretation.asterisks}
          locale={locale}
        />

        <InterpretationCard
          title={labels.stressSources}
          functionSymbol={'\u2013'}
          primary={analysis.minus.pair.primary}
          secondary={analysis.minus.pair.secondary}
          text=""
          asterisks={analysis.minus.interpretation.asterisks}
          locale={locale}
          sections={[
            { label: labels.physiological, text: analysis.minus.interpretation.physiological[lang] },
            { label: labels.psychological, text: analysis.minus.interpretation.psychological[lang] },
            { label: labels.inBrief, text: analysis.minus.interpretation.inBrief[lang] },
          ]}
        />

        <InterpretationCard
          title={labels.actualProblem}
          functionSymbol="+-"
          primary={analysis.plusMinus.pair.primary}
          secondary={analysis.plusMinus.pair.secondary}
          text={analysis.plusMinus.interpretation.text[lang]}
          asterisks={analysis.plusMinus.interpretation.asterisks}
          locale={locale}
        />
      </section>

      {/* 4. Multiple Actual Problems */}
      {deep && deep.actualProblems.length > 0 && (
        <section>
          <ActualProblems
            problems={deep.actualProblems}
            locale={locale}
            labels={labels.actualProblems}
          />
        </section>
      )}

      {/* 5. Deep Analysis (work-group, autonomic, conflict, ambivalence, comparison) */}
      {deep && (
        <section>
          <DeepAnalysis
            analysis={deep}
            locale={locale}
            labels={labels.deepAnalysis}
          />
        </section>
      )}

      {/* 6. Individual Color Notes */}
      {deep && deep.colorNotes.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-bold text-charcoal">{labels.colorNotes.title}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {deep.colorNotes.map((cn, i) => (
              <ColorProfileNote
                key={i}
                colorId={cn.colorId}
                position={cn.position}
                note={cn.note[lang]}
                locale={locale}
                positionLabel={labels.colorNotes.position}
              />
            ))}
          </div>
        </section>
      )}

      {/* 7. Print Button */}
      <div className="flex justify-center pt-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {labels.printReport}
        </button>
      </div>
    </div>
  );
}

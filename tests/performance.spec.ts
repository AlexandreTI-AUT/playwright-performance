import { test as base } from '@playwright/test';
import type { PerformanceOptions, PlaywrightPerformance, PerformanceWorker } from 'playwright-performance';
import { playwrightPerformance } from 'playwright-performance';
import { expect } from 'chai';

const test = base.extend<PlaywrightPerformance, PerformanceOptions & PerformanceWorker>({
  performance: playwrightPerformance.performance,
  performanceOptions: [
    {
      disableAppendToExistingFile: true,
      performanceResultsFileName: 'performance-results',
      dropResultsFromFailedTest: false,
      analyzeByBrowser: false,
      suppressConsoleResults: false,
      recentDays: 0,
    },
    { scope: 'worker' },
  ],
  worker: [playwrightPerformance.worker, { scope: 'worker', auto: true }],
});

test('startup performance', async ({ page, performance }) => {
  for (let i = 0; i <= 10; i++) {
    performance.sampleStart('GH-startup');
    await page.goto('http://github.com/');
    performance.sampleEnd('GH-startup');
    expect(performance.getSampleTime('GH-startup')).to.be.at.lessThan(6000);
  }

  performance.sampleStart('SF-startup');
  await page.goto('https://sourceforge.net/');
  performance.sampleEnd('SF-startup');
});

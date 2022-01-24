import { ApplicationInsights, IEventTelemetry } from '@microsoft/applicationinsights-web'



export class AppInsightHelper {
    private static instrumentationKey: string = "f0aac823-be19-41a7-b663-58e8db617268";

    private static PCFControlAppInsights: ApplicationInsights;

    public AppInsightHelper() {

    }

    public static getAppInsightHelper(): ApplicationInsights {

        if (!this.PCFControlAppInsights) {
            this.PCFControlAppInsights = new ApplicationInsights({
                config: {
                    instrumentationKey: AppInsightHelper.instrumentationKey,
                    enableResponseHeaderTracking: false,
                    enableRequestHeaderTracking: true
                }
            });
        }

        if (!this.PCFControlAppInsights.core.isInitialized!()) {
            this.PCFControlAppInsights.loadAppInsights();
        }

        return this.PCFControlAppInsights;
    }

}
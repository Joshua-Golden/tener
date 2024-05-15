import React from 'react'
import { redirect } from 'next/navigation';

import { getLanesWithTicketAndTags, getPipelineDetails, updateLanesOrder, updateTicketsOrder } from '@/lib/queries';
import { db } from '@/lib/db';
import { LaneDetail } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PipelineInfoBar from './components/pipeline-infobar'
import PipelineSettings from './components/pipeline-settings'
import PipelineView from './components/pipeline-view'
import { Separator } from '@/components/ui/separator';

interface PipelinesIdProps {
    params: { subaccountId: string; pipelineId: string}
}

const PipelinesId = async ({ params }: PipelinesIdProps) => {

    const pipelineDetails = await getPipelineDetails(params.pipelineId)
    if (!pipelineDetails) return redirect(`/subaccount/${params.subaccountId}/pipelines`)

    const pipelines = await db.pipeline.findMany({
    where: { subAccountId: params.subaccountId },
    })
    
    const lanes = (await getLanesWithTicketAndTags(params.pipelineId)) as LaneDetail[]

    return (
        <Tabs
            defaultValue="view"
            className="w-full"
        >
            <TabsList className="bg-transparent h-16 w-full justify-between mb-4">
                <PipelineInfoBar
                    pipelineId={params.pipelineId}
                    subAccountId={params.subaccountId}
                    pipelines={pipelines}
                />
                <div>
                <TabsTrigger value="view">Pipeline View</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                </div>
            </TabsList>
            <Separator />
            <TabsContent value="view">
                <PipelineView
                    lanes={lanes}
                    pipelineDetails={pipelineDetails}
                    pipelineId={params.pipelineId}
                    subaccountId={params.subaccountId}
                    updateLanesOrder={updateLanesOrder}
                    updateTicketsOrder={updateTicketsOrder}
                />
            </TabsContent>
            <TabsContent value="settings">
                <PipelineSettings
                    pipelineId={params.pipelineId}
                    pipelines={pipelines}
                    subaccountId={params.subaccountId}
                />
            </TabsContent>
        </Tabs>
    )
}

export default PipelinesId
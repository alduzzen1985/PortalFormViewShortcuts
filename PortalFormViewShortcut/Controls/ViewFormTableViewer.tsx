import * as React from 'react';
import { useState, useEffect } from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Link, FontIcon } from 'office-ui-fabric-react'
import { initializeIcons } from '@uifabric/icons';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { AppInsightHelper } from '../Helpers/ApplicationInsight'


export interface IViewsFormsItem {
    id: string,
    name: string,
    isUsed: boolean,
    linkPowerApps: string,
    linkClassic: string,
    usedFormViews: string[] | null | undefined
}

export interface IiewsFormsProperties {
    items: IViewsFormsItem[]
}


export default class ViewFormTableViewer extends React.Component<IiewsFormsProperties, {}> {



    render() {
        initializeIcons();

        const _columns: IColumn[] = [
            { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 300, isResizable: true },
            { key: 'isUsed', name: 'Is Used', fieldName: 'isUsed', minWidth: 100, maxWidth: 100, isResizable: true },
            { key: 'linkPowerApps', name: 'PowerApps', fieldName: 'linkPowerApps', minWidth: 100, maxWidth: 150, isResizable: true },
            { key: 'linkClassic', name: 'Classic', fieldName: 'linkClassic', minWidth: 100, maxWidth: 150, isResizable: true }
        ];


        function _renderItemColumn(item: IViewsFormsItem, index: number | undefined, column: IColumn | undefined) {
            if (!!column) {
                const fieldContent = item[column.fieldName as keyof IViewsFormsItem] as any;

                const fontSize = 24;

                const iconClass = mergeStyles({
                    fontSize: fontSize,
                    margin: '0 10px',
                });

                const iconUsedClass = mergeStyles({
                    fontSize: fontSize,
                    margin: '0 10px',
                    color: 'green'
                });


                const iconPowerAppsClass = mergeStyles({
                    fontSize: fontSize,
                    margin: '0 10px',
                    color: '#742774'
                });

                const PowerAppsClick = () => {
                    AppInsightHelper.getAppInsightHelper().trackEvent({ name: "PowerApps Click" });
                }

                const ClassicClick = () => {
                    AppInsightHelper.getAppInsightHelper().trackEvent({ name: "Classic Click" });
                }

                switch (column.key) {
                    case 'linkPowerApps':
                        return <Link href={fieldContent} target='_blank'><FontIcon iconName='PowerAppsLogo' className={iconPowerAppsClass} onClick={PowerAppsClick}></FontIcon></Link>;
                    case 'linkClassic':
                        return <Link href={fieldContent} target='_blank'><FontIcon iconName='Dynamics365Logo' className={iconClass} onClick={ClassicClick}></FontIcon></Link>;
                    case 'name':
                        return <span>{fieldContent}</span>;
                    case 'isUsed':
                        if (fieldContent == true) {
                            return <FontIcon iconName='Accept' className={iconUsedClass} ></FontIcon>;
                        } else {
                            return <span></span>;
                        }
                    default:
                        return <span></span>;
                }
            }
        }



        return (
            <div>
                <DetailsList items={this.props.items}
                    columns={_columns}
                    onRenderItemColumn={_renderItemColumn}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.justified}>
                </DetailsList>
            </div>
        )
    }


}
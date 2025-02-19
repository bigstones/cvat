// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) 2022-2023 CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import { Row, Col } from 'antd/lib/grid';
import { MoreOutlined } from '@ant-design/icons';
import Dropdown from 'antd/lib/dropdown';
import Text from 'antd/lib/typography/Text';

import { ObjectType, ShapeType, ColorBy } from 'reducers';
import CVATTooltip from 'components/common/cvat-tooltip';
import LabelSelector from 'components/label-selector/label-selector';
import ItemMenu from './object-item-menu';

interface Props {
    jobInstance: any;
    readonly: boolean;
    clientID: number;
    serverID: number | null;
    labelID: number;
    labels: any[];
    shapeType: ShapeType;
    objectType: ObjectType;
    isGroundTruth: boolean;
    color: string;
    colorBy: ColorBy;
    type: string;
    locked: boolean;
    changeColorShortcut: string;
    copyShortcut: string;
    pasteShortcut: string;
    propagateShortcut: string;
    toBackgroundShortcut: string;
    toForegroundShortcut: string;
    removeShortcut: string;
    sliceShortcut: string;
    changeColor(color: string): void;
    changeLabel(label: any): void;
    copy(): void;
    remove(): void;
    propagate(): void;
    createURL(): void;
    switchOrientation(): void;
    toBackground(): void;
    toForeground(): void;
    resetCuboidPerspective(): void;
    edit(): void;
    slice(): void;
}

function ItemTopComponent(props: Props): JSX.Element {
    const {
        readonly,
        clientID,
        serverID,
        labelID,
        labels,
        shapeType,
        objectType,
        color,
        colorBy,
        type,
        locked,
        changeColorShortcut,
        copyShortcut,
        pasteShortcut,
        propagateShortcut,
        toBackgroundShortcut,
        toForegroundShortcut,
        removeShortcut,
        sliceShortcut,
        isGroundTruth,
        changeColor,
        changeLabel,
        copy,
        remove,
        propagate,
        createURL,
        switchOrientation,
        toBackground,
        toForeground,
        resetCuboidPerspective,
        edit,
        slice,
        jobInstance,
    } = props;

    const [menuVisible, setMenuVisible] = useState(false);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const changeMenuVisible = (visible: boolean): void => {
        if (!visible && colorPickerVisible) return;
        setMenuVisible(visible);
    };

    const changeColorPickerVisible = (visible: boolean): void => {
        if (!visible) {
            setMenuVisible(false);
        }
        setColorPickerVisible(visible);
    };

    return (
        <Row align='middle'>
            <Col span={10}>
                <Text style={{ fontSize: 12 }}>{clientID}</Text>
                {isGroundTruth ? <Text style={{ fontSize: 12 }}>&nbsp;GT</Text> : null}
                <br />
                <Text
                    type='secondary'
                    style={{ fontSize: 10 }}
                    className='cvat-objects-sidebar-state-item-object-type-text'
                >
                    {type}
                </Text>
            </Col>
            <Col span={12}>
                <CVATTooltip title='Change current label'>
                    <LabelSelector
                        disabled={readonly || shapeType === ShapeType.SKELETON}
                        size='small'
                        labels={labels}
                        value={labelID}
                        onChange={changeLabel}
                        className='cvat-objects-sidebar-state-item-label-selector'
                    />
                </CVATTooltip>
            </Col>
            { !isGroundTruth && (
                <Col span={2}>
                    <Dropdown
                        visible={menuVisible}
                        onVisibleChange={changeMenuVisible}
                        placement='bottomLeft'
                        trigger={menuVisible ? ['click'] : ['click', 'hover']}
                        overlay={ItemMenu({
                            jobInstance,
                            readonly,
                            serverID,
                            locked,
                            shapeType,
                            objectType,
                            color,
                            colorBy,
                            colorPickerVisible,
                            changeColorShortcut,
                            copyShortcut,
                            pasteShortcut,
                            propagateShortcut,
                            toBackgroundShortcut,
                            toForegroundShortcut,
                            removeShortcut,
                            sliceShortcut,
                            changeColor,
                            copy,
                            remove,
                            propagate,
                            createURL,
                            switchOrientation,
                            toBackground,
                            toForeground,
                            resetCuboidPerspective,
                            changeColorPickerVisible,
                            edit,
                            slice,
                        })}
                    >
                        <MoreOutlined />
                    </Dropdown>
                </Col>
            )}
        </Row>
    );
}

export default React.memo(ItemTopComponent);

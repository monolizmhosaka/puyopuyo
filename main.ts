namespace SpriteKind {
    export const Puyo = SpriteKind.create()
    export const UI = SpriteKind.create()
}
function InitConstVariable () {
    FIELD_WIDTH = 6
    FIELD_HEIGHT = 14
    FIELD_CELLSIZE = 6
    START_TIME = 1000
    OPERATING_PUYO_FALL_TIME = 1000
    FPS = 60
    NEXT_PUYO_POS_X = 103
    NEXT_PUYO_POS_Y = 21
    NEXT2_PUYO_POS_X = 110
    NEXT2_PUYO_POS_Y = 21
    LEFT_ROTATE_INTERVAL = 1000 / FPS * 4
    RIGHT_ROTATE_INTERVAL = 1000 / FPS * 4
    LEFT_MOVE_INTERVAL = 1000 / FPS * 2
    RIGHT_MOVE_INTERVAL = 1000 / FPS * 2
    DOWN_MOVE_INTERVAL = 0
    PUT_PUYO_TIME = 500
    DELETE_PUYO_TIME = 500
    FALL_START_PUYO_TIME = 500
    operatingPuyoPosX = 0
    operatingPuyoPosY = 0
    FIELD_POS_X = 80 - FIELD_WIDTH * FIELD_CELLSIZE / 2
    FIELD_POS_Y = 60 - FIELD_HEIGHT * FIELD_CELLSIZE / 2
    CHAIN_FACTOR_ARRAY = [19]
    CHAIN_FACTOR_ARRAY[0] = 0
    CHAIN_FACTOR_ARRAY[1] = 8
    CHAIN_FACTOR_ARRAY[2] = 16
    CHAIN_FACTOR_ARRAY[3] = 32
    CHAIN_FACTOR_ARRAY[4] = 64
    CHAIN_FACTOR_ARRAY[5] = 96
    CHAIN_FACTOR_ARRAY[6] = 128
    CHAIN_FACTOR_ARRAY[7] = 160
    CHAIN_FACTOR_ARRAY[8] = 192
    CHAIN_FACTOR_ARRAY[9] = 224
    CHAIN_FACTOR_ARRAY[10] = 256
    CHAIN_FACTOR_ARRAY[11] = 288
    CHAIN_FACTOR_ARRAY[12] = 320
    CHAIN_FACTOR_ARRAY[13] = 352
    CHAIN_FACTOR_ARRAY[14] = 384
    CHAIN_FACTOR_ARRAY[15] = 416
    CHAIN_FACTOR_ARRAY[16] = 448
    CHAIN_FACTOR_ARRAY[17] = 480
    CHAIN_FACTOR_ARRAY[18] = 512
    CONNECTED_COUNT_FACTOR_ARRAY = [8]
    CONNECTED_COUNT_FACTOR_ARRAY[0] = 0
    CONNECTED_COUNT_FACTOR_ARRAY[1] = 2
    CONNECTED_COUNT_FACTOR_ARRAY[2] = 3
    CONNECTED_COUNT_FACTOR_ARRAY[3] = 4
    CONNECTED_COUNT_FACTOR_ARRAY[4] = 5
    CONNECTED_COUNT_FACTOR_ARRAY[5] = 6
    CONNECTED_COUNT_FACTOR_ARRAY[6] = 7
    CONNECTED_COUNT_FACTOR_ARRAY[7] = 10
    DELETE_COLOR_COUNT_FACTOR_ARRAY = [5]
    DELETE_COLOR_COUNT_FACTOR_ARRAY[0] = 0
    DELETE_COLOR_COUNT_FACTOR_ARRAY[1] = 3
    DELETE_COLOR_COUNT_FACTOR_ARRAY[2] = 6
    DELETE_COLOR_COUNT_FACTOR_ARRAY[3] = 12
    DELETE_COLOR_COUNT_FACTOR_ARRAY[4] = 24
}
function FallFieldPuyoAll () {
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        FallFieldPuyo(FIELD_WIDTH * FIELD_HEIGHT - 1 - カウンター)
    }
}
function GetOperatingPuyoTop () {
    if (operatingPuyoDirection == 0) {
        return operatingPuyoPosY - 1
    } else {
        return operatingPuyoPosY
    }
}
function PosToFieldIndex (PosX: number, PosY: number) {
    return PosX + PosY * FIELD_WIDTH
}
function SetPuyoColorOnFrame (puyo: Sprite, color: number) {
    if (color == 1) {
        puyo.setImage(assets.image`Puyo_Red_On_Frame`)
    }
    if (color == 2) {
        puyo.setImage(assets.image`Puyo_Blue_On_Frame`)
    }
    if (color == 3) {
        puyo.setImage(assets.image`Puyo_Green_On_Frame`)
    }
    if (color == 4) {
        puyo.setImage(assets.image`Puyo_Yellow_On_Frame`)
    }
}
function SetPuyoColor (puyo: Sprite, color: number) {
    if (color == 1) {
        puyo.setImage(assets.image`Puyo_Red`)
    }
    if (color == 2) {
        puyo.setImage(assets.image`Puyo_Blue`)
    }
    if (color == 3) {
        puyo.setImage(assets.image`Puyo_Green`)
    }
    if (color == 4) {
        puyo.setImage(assets.image`Puyo_Yellow`)
    }
}
function DeletePuyo () {
    for (let カウンター = 0; カウンター <= isDeleteArray.length - 1; カウンター++) {
        if (isDeleteArray[カウンター] == 1) {
            fieldArray[カウンター] = 0
        }
    }
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        isDeleteArray[カウンター] = 0
    }
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        deleteCheckProgressArray[カウンター] = 0
    }
    isDelete = false
    spaceCountOnDeleteCheck = 0
    chainCount += 1
    deleteColorCount = 0
    for (let カウンター = 0; カウンター <= 3; カウンター++) {
        if (deleteColorArray[カウンター] == 1) {
            deleteColorCount += 1
        }
    }
    if (chainCount == 1 && maxConnectedCount == 4 && deleteColorCount == 1) {
        score += 1 * (10 * deleteCount)
    } else {
        if (11 <= maxConnectedCount) {
            tmp = CHAIN_FACTOR_ARRAY[chainCount - 1] + CONNECTED_COUNT_FACTOR_ARRAY[7] + DELETE_COLOR_COUNT_FACTOR_ARRAY[deleteColorCount - 1]
            score += tmp * (10 * deleteCount)
        } else {
            tmp = CHAIN_FACTOR_ARRAY[chainCount - 1] + CONNECTED_COUNT_FACTOR_ARRAY[maxConnectedCount - 4] + DELETE_COLOR_COUNT_FACTOR_ARRAY[deleteColorCount - 1]
            score += tmp * (10 * deleteCount)
        }
    }
    info.setScore(score)
}
function GetOperatingPuyoLeft () {
    if (operatingPuyoDirection == 3) {
        return operatingPuyoPosX - 1
    } else {
        return operatingPuyoPosX
    }
}
// DeleteCheckという関数名でオーバーロードしようとしたがエラーが出てしまったので関数名を変更した
function DeleteCheck2 (index: number) {
    isDeleteCheckingArray[index] = 1
    if (fieldArray[index] == 0) {
        spaceCountOnDeleteCheck += 1
        return
    } else {
        spaceCountOnDeleteCheck = 0
    }
    deleteCheckProgressArray[index] = 1
    if (0 <= index - FIELD_WIDTH && fieldArray[index] == fieldArray[index - FIELD_WIDTH] && deleteCheckProgressArray[index - FIELD_WIDTH] != 1) {
        connectedCount += 1
        DeleteCheck2(index - FIELD_WIDTH)
    }
    if (index % FIELD_WIDTH + 1 < FIELD_WIDTH && fieldArray[index] == fieldArray[index + 1] && deleteCheckProgressArray[index + 1] != 1) {
        connectedCount += 1
        DeleteCheck2(index + 1)
    }
    if (index + FIELD_WIDTH < FIELD_WIDTH * FIELD_HEIGHT && fieldArray[index] == fieldArray[index + FIELD_WIDTH] && deleteCheckProgressArray[index + FIELD_WIDTH] != 1) {
        connectedCount += 1
        DeleteCheck2(index + FIELD_WIDTH)
    }
    if (0 <= index % FIELD_WIDTH - 1 && fieldArray[index] == fieldArray[index - 1] && deleteCheckProgressArray[index - 1] != 1) {
        connectedCount += 1
        DeleteCheck2(index - 1)
    }
    return
}
function Paint () {
    for (let 値 of sprites.allOfKind(SpriteKind.Puyo)) {
        値.destroy()
    }
    mySprite = sprites.create(assets.image`X`, SpriteKind.Puyo)
    mySprite.setPosition(FIELD_POS_X + 2 * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + FIELD_CELLSIZE / 2)
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        if (カウンター < 12) {
            カウンター = 12
        }
        if (fieldArray[カウンター] > 0) {
            mySprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Puyo)
            mySprite.setKind(SpriteKind.Puyo)
            SetPuyoColor(mySprite, fieldArray[カウンター])
            mySprite.setPosition(FIELD_POS_X + カウンター % FIELD_WIDTH * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (Math.floor(カウンター / FIELD_WIDTH) - 2) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
        }
    }
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Puyo)
    mySprite.setKind(SpriteKind.Puyo)
    SetPuyoColor(mySprite, nextPuyoArray[1])
    mySprite.setPosition(NEXT_PUYO_POS_X, NEXT_PUYO_POS_Y)
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Puyo)
    mySprite.setKind(SpriteKind.Puyo)
    SetPuyoColor(mySprite, nextPuyoArray[0])
    mySprite.setPosition(NEXT_PUYO_POS_X, NEXT_PUYO_POS_Y + FIELD_CELLSIZE)
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Puyo)
    mySprite.setKind(SpriteKind.Puyo)
    SetPuyoColor(mySprite, next2PuyoArray[1])
    mySprite.setPosition(NEXT2_PUYO_POS_X, NEXT2_PUYO_POS_Y)
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Puyo)
    mySprite.setKind(SpriteKind.Puyo)
    SetPuyoColor(mySprite, next2PuyoArray[0])
    mySprite.setPosition(NEXT2_PUYO_POS_X, NEXT2_PUYO_POS_Y + FIELD_CELLSIZE)
    if (state == 1) {
        predictionSprite1 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Puyo)
        SetPuyoColorPrediction(predictionSprite1, operatingPuyoArray[0])
        predictionSprite2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Puyo)
        SetPuyoColorPrediction(predictionSprite2, operatingPuyoArray[1])
        if (operatingPuyoDirection == 2) {
            for (let カウンター = 0; カウンター <= FIELD_HEIGHT; カウンター++) {
                if (!(FallCheck(PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY + operatingPuyo2PosY + カウンター)))) {
                    predictionSprite2.setPosition(FIELD_POS_X + operatingPuyoPosX * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (operatingPuyoPosY + operatingPuyo2PosY - 2 + カウンター) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
                    predictionSprite1.setPosition(FIELD_POS_X + operatingPuyoPosX * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (operatingPuyoPosY - 2 + カウンター) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
                    break;
                }
            }
        } else if (operatingPuyoDirection == 0) {
            for (let カウンター = 0; カウンター <= FIELD_HEIGHT; カウンター++) {
                if (!(FallCheck(PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY + カウンター)))) {
                    predictionSprite1.setPosition(FIELD_POS_X + operatingPuyoPosX * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (operatingPuyoPosY - 2 + カウンター) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
                    predictionSprite2.setPosition(FIELD_POS_X + operatingPuyoPosX * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (operatingPuyoPosY + operatingPuyo2PosY - 2 + カウンター) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
                    break;
                }
            }
        } else {
            for (let カウンター = 0; カウンター <= FIELD_HEIGHT; カウンター++) {
                if (!(FallCheck(PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY + カウンター)))) {
                    predictionSprite1.setPosition(FIELD_POS_X + operatingPuyoPosX * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (operatingPuyoPosY - 2 + カウンター) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
                    break;
                }
            }
            for (let カウンター = 0; カウンター <= FIELD_HEIGHT; カウンター++) {
                if (!(FallCheck(PosToFieldIndex(operatingPuyoPosX + operatingPuyo2PosX, operatingPuyoPosY + カウンター)))) {
                    predictionSprite2.setPosition(FIELD_POS_X + (operatingPuyoPosX + operatingPuyo2PosX) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (operatingPuyoPosY - 2 + カウンター) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
                    break;
                }
            }
        }
        if (predictionSprite1.y < FIELD_POS_Y + 1 * FIELD_CELLSIZE + FIELD_CELLSIZE / 2) {
            predictionSprite1.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
        if (predictionSprite2.y < FIELD_POS_Y + 1 * FIELD_CELLSIZE + FIELD_CELLSIZE / 2) {
            predictionSprite2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
        operatingPuyoSprite1 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Puyo)
        SetPuyoColorOnFrame(operatingPuyoSprite1, operatingPuyoArray[0])
        operatingPuyoSprite1.setPosition(FIELD_POS_X + operatingPuyoPosX * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (operatingPuyoPosY - 2) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
        operatingPuyoSprite2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Puyo)
        SetPuyoColorOnFrame(operatingPuyoSprite2, operatingPuyoArray[1])
        operatingPuyoSprite2.setPosition(FIELD_POS_X + (operatingPuyoPosX + operatingPuyo2PosX) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2, FIELD_POS_Y + (operatingPuyoPosY + operatingPuyo2PosY - 2) * FIELD_CELLSIZE + FIELD_CELLSIZE / 2)
        if (operatingPuyoPosY <= 1) {
            operatingPuyoSprite1.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
        if (operatingPuyoPosY + operatingPuyo2PosY <= 1) {
            operatingPuyoSprite2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
}
function SetPuyoColorPrediction (puyo: Sprite, color: number) {
    if (color == 1) {
        puyo.setImage(assets.image`Puyo_Red_Prediction`)
    }
    if (color == 2) {
        puyo.setImage(assets.image`Puyo_Blue_Prediction`)
    }
    if (color == 3) {
        puyo.setImage(assets.image`Puyo_Green_Prediction`)
    }
    if (color == 4) {
        puyo.setImage(assets.image`Puyo_Yellow_Prediction`)
    }
}
// 0:上
// 1:右
// 2:下
// 3:左
function MovePuyo (direction: number) {
    if (direction == 1) {
        if (RIGHT_MOVE_INTERVAL < rightMoveIntervalTimer) {
            if (!(MoveCheck(direction))) {
                return
            }
            operatingPuyoPosX += 1
            rightMoveIntervalTimer = 0
        }
    }
    if (direction == 2) {
        if (DOWN_MOVE_INTERVAL < downMoveIntervalTimer) {
            if (MoveCheck(direction)) {
                operatingPuyoPosY += 1
                operatingPuyoFallTimer = 0
                downMoveIntervalTimer = 0
                if (controller.down.isPressed()) {
                    score += 1
                    info.setScore(score)
                }
            } else {
                if (0 < operatingPuyoPosY || operatingPuyoPosY == 0 && !(operatingPuyoDirection == 0)) {
                    fieldArray[PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY)] = operatingPuyoArray[0]
                    fieldArray[PosToFieldIndex(operatingPuyoPosX + operatingPuyo2PosX, operatingPuyoPosY + operatingPuyo2PosY)] = operatingPuyoArray[1]
                    if (operatingPuyoDirection == 2) {
                        FallFieldPuyo(PosToFieldIndex(operatingPuyoPosX + operatingPuyo2PosX, operatingPuyoPosY + operatingPuyo2PosY))
                        FallFieldPuyo(PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY))
                    } else {
                        FallFieldPuyo(PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY))
                        FallFieldPuyo(PosToFieldIndex(operatingPuyoPosX + operatingPuyo2PosX, operatingPuyoPosY + operatingPuyo2PosY))
                    }
                } else {
                    if (operatingPuyoDirection == 2) {
                        if (1 == operatingPuyoPosY + operatingPuyo2PosY) {
                            fieldArray[PosToFieldIndex(operatingPuyoPosX + operatingPuyo2PosX, operatingPuyoPosY + operatingPuyo2PosY)] = operatingPuyoArray[1]
                        }
                    } else if (operatingPuyoDirection == 0) {
                        if (1 == operatingPuyoPosY) {
                            fieldArray[PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY)] = operatingPuyoArray[0]
                        } else {
                            fieldArray[PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY)] = operatingPuyoArray[0]
                            fieldArray[PosToFieldIndex(operatingPuyoPosX + operatingPuyo2PosX, operatingPuyoPosY + operatingPuyo2PosY)] = operatingPuyoArray[1]
                        }
                    } else {
                        fieldArray[PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY)] = operatingPuyoArray[0]
                        FallFieldPuyo(PosToFieldIndex(operatingPuyoPosX, operatingPuyoPosY))
                        fieldArray[PosToFieldIndex(operatingPuyoPosX + operatingPuyo2PosX, operatingPuyoPosY + operatingPuyo2PosY)] = operatingPuyoArray[1]
                        FallFieldPuyo(PosToFieldIndex(operatingPuyoPosX + operatingPuyo2PosX, operatingPuyoPosY + operatingPuyo2PosY))
                    }
                    for (let カウンター = 0; カウンター <= FIELD_WIDTH - 1; カウンター++) {
                        fieldArray[PosToFieldIndex(カウンター, 0)] = 0
                    }
                }
                state = 2
            }
        }
    }
    if (direction == 3) {
        if (LEFT_MOVE_INTERVAL < leftMoveIntervalTimer) {
            if (!(MoveCheck(direction))) {
                return
            }
            operatingPuyoPosX += -1
            leftMoveIntervalTimer = 0
        }
    }
}
function GetOperatingPuyoRight () {
    if (operatingPuyoDirection == 1) {
        return operatingPuyoPosX + 1
    } else {
        return operatingPuyoPosX
    }
}
// 0:左
// 1:右
function RotatePuyo (direction: number) {
    if (direction == 0) {
        if (LEFT_ROTATE_INTERVAL < leftRotateIntervalTimer) {
            if (operatingPuyoDirection == 0) {
                if (fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) - 1] == 0 && 0 <= operatingPuyoPosX - 1) {
                    operatingPuyoDirection += -1
                } else {
                    if (fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) + 1] == 0 && operatingPuyoPosX + 1 < FIELD_WIDTH) {
                        operatingPuyoPosX += 1
                        operatingPuyoDirection += -1
                    } else {
                        if (isRotatingLeftMiddle == true) {
                            if (!(fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) + FIELD_WIDTH] == 0) && operatingPuyoPosY + 1 < FIELD_HEIGHT) {
                                operatingPuyoPosY += 1
                            }
                            operatingPuyoDirection += 2
                            isRotatingLeftMiddle = false
                        } else {
                            isRotatingLeftMiddle = true
                        }
                    }
                }
            } else if (operatingPuyoDirection == 1) {
                operatingPuyoDirection += -1
            } else if (operatingPuyoDirection == 2) {
                if (fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoTop()) + 1] == 0 && operatingPuyoPosX + 1 < FIELD_WIDTH) {
                    operatingPuyoDirection += -1
                } else {
                    if (fieldArray[PosToFieldIndex(GetOperatingPuyoRight(), GetOperatingPuyoTop()) - 1] == 0 && 0 <= operatingPuyoPosX - 1) {
                        operatingPuyoPosX += -1
                        operatingPuyoDirection += -1
                    } else {
                        if (isRotatingLeftMiddle == true) {
                            operatingPuyoDirection += -2
                            isRotatingLeftMiddle = false
                        }
                        isRotatingLeftMiddle = true
                    }
                }
            } else {
                if (fieldArray[PosToFieldIndex(GetOperatingPuyoRight(), GetOperatingPuyoBottom()) + FIELD_WIDTH] == 0 && operatingPuyoPosY + 1 < FIELD_HEIGHT) {
                    operatingPuyoDirection += -1
                } else {
                    operatingPuyoPosY += -1
                    operatingPuyoDirection += -1
                }
            }
            if (operatingPuyoDirection < 0) {
                operatingPuyoDirection = (operatingPuyoDirection % 4 + 4) % 4
            }
            leftRotateIntervalTimer = 0
        }
    } else {
        if (RIGHT_ROTATE_INTERVAL < rightRotateIntervalTimer) {
            if (operatingPuyoDirection == 0) {
                if (fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) + 1] == 0 && operatingPuyoPosX + 1 < FIELD_WIDTH) {
                    operatingPuyoDirection += 1
                } else {
                    if (fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) - 1] == 0 && 0 <= operatingPuyoPosX - 1) {
                        operatingPuyoPosX += -1
                        operatingPuyoDirection += 1
                    } else {
                        if (isRotatingRightMiddle == true) {
                            if (!(fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) + FIELD_WIDTH] == 0) && operatingPuyoPosY + 1 < FIELD_HEIGHT) {
                                operatingPuyoPosY += 1
                            }
                            operatingPuyoDirection += 2
                            isRotatingRightMiddle = false
                        } else {
                            isRotatingRightMiddle = true
                        }
                    }
                }
            } else if (operatingPuyoDirection == 1) {
                if (fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) + FIELD_WIDTH] == 0 && operatingPuyoPosY + 1 < FIELD_HEIGHT) {
                    operatingPuyoDirection += 1
                } else {
                    operatingPuyoPosY += -1
                    operatingPuyoDirection += 1
                }
            } else if (operatingPuyoDirection == 2) {
                if (fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoTop()) - 1] == 0 && 0 <= operatingPuyoPosX - 1) {
                    operatingPuyoDirection += 1
                } else {
                    if (fieldArray[PosToFieldIndex(GetOperatingPuyoRight(), GetOperatingPuyoTop()) + 1] == 0 && operatingPuyoPosX + 1 < FIELD_WIDTH) {
                        operatingPuyoPosX += 1
                        operatingPuyoDirection += 1
                    } else {
                        if (isRotatingRightMiddle == true) {
                            operatingPuyoDirection += 2
                            isRotatingRightMiddle = false
                        }
                        isRotatingRightMiddle = true
                    }
                }
            } else {
                operatingPuyoDirection += 1
            }
            if (operatingPuyoDirection > 3) {
                operatingPuyoDirection = operatingPuyoDirection % 4
            }
            rightRotateIntervalTimer = 0
        }
    }
    if (operatingPuyoDirection == 0) {
        operatingPuyo2PosX = 0
        operatingPuyo2PosY = -1
    } else if (operatingPuyoDirection == 1) {
        operatingPuyo2PosX = 1
        operatingPuyo2PosY = 0
    } else if (operatingPuyoDirection == 2) {
        operatingPuyo2PosX = 0
        operatingPuyo2PosY = 1
    } else {
        operatingPuyo2PosX = -1
        operatingPuyo2PosY = 0
    }
}
function MoveCheck (direction: number) {
    if (direction == 1) {
        if (GetOperatingPuyoRight() + 1 < FIELD_WIDTH && fieldArray[PosToFieldIndex(GetOperatingPuyoRight(), GetOperatingPuyoBottom()) + 1] == 0) {
            return true
        }
    }
    if (direction == 2) {
        if (GetOperatingPuyoBottom() + 1 < FIELD_HEIGHT && fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) + FIELD_WIDTH] == 0 && fieldArray[PosToFieldIndex(GetOperatingPuyoRight(), GetOperatingPuyoBottom()) + FIELD_WIDTH] == 0) {
            return true
        }
    }
    if (direction == 3) {
        if (-1 < GetOperatingPuyoLeft() - 1 && fieldArray[PosToFieldIndex(GetOperatingPuyoLeft(), GetOperatingPuyoBottom()) - 1] == 0) {
            return true
        }
    }
    return false
}
function GetOperatingPuyoBottom () {
    if (operatingPuyoDirection == 2) {
        return operatingPuyoPosY + 1
    } else {
        return operatingPuyoPosY
    }
}
function DeleteCheck () {
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        isDeleteArray[カウンター] = 0
    }
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        deleteCheckProgressArray[カウンター] = 0
    }
    for (let カウンター = 0; カウンター <= 3; カウンター++) {
        deleteColorArray[カウンター] = 0
    }
    isDelete = false
    spaceCountOnDeleteCheck = 0
    connectedCount = 0
    maxConnectedCount = 0
    deleteCount = 0
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1 - 1; カウンター++) {
        for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
            isDeleteCheckingArray[カウンター] = 0
        }
        connectedCount = 1
        DeleteCheck2(FIELD_WIDTH * FIELD_HEIGHT - 1 - カウンター)
        if (4 <= connectedCount) {
            isDelete = true
            for (let カウンター = 0; カウンター <= isDeleteCheckingArray.length - 1; カウンター++) {
                if (isDeleteCheckingArray[カウンター] == 1) {
                    isDeleteArray[カウンター] = 1
                    deleteCount += 1
                    deleteColorArray[fieldArray[カウンター] - 1] = 1
                }
            }
            if (maxConnectedCount < connectedCount) {
                maxConnectedCount = connectedCount
            }
        }
        if (spaceCountOnDeleteCheck == FIELD_WIDTH) {
            break;
        }
    }
}
function DefeatCheck () {
    if (fieldArray[FIELD_WIDTH * 2 + 2]) {
        return true
    }
    return false
}
function FallFieldPuyo (index: number) {
    if (0 <= index) {
        if (FallCheck(index)) {
            fieldArray[index + FIELD_WIDTH] = fieldArray[index]
            fieldArray[index] = 0
            FallFieldPuyo(index + FIELD_WIDTH)
        } else {
            return
        }
    } else {
    	
    }
}
function Initialize () {
    info.setScore(0)
    score = 0
    state = 0
    operatingPuyoFallTimer = 0
    putPuyoTimer = 0
    deletePuyoTimer = 0
    fallStartPuyoTimer = 0
    startTimer = 0
    operatingPuyoDirection = 0
    operatingPuyo2PosX = 0
    operatingPuyo2PosY = -1
    fieldArray = [FIELD_WIDTH * FIELD_HEIGHT]
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        fieldArray[カウンター] = 0
    }
    isDeleteArray = [FIELD_WIDTH * FIELD_HEIGHT]
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        isDeleteArray[カウンター] = 0
    }
    isDeleteCheckingArray = [FIELD_WIDTH * FIELD_HEIGHT]
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        isDeleteCheckingArray[カウンター] = 0
    }
    deleteCheckProgressArray = [FIELD_WIDTH * FIELD_HEIGHT]
    for (let カウンター = 0; カウンター <= FIELD_WIDTH * FIELD_HEIGHT - 1; カウンター++) {
        deleteCheckProgressArray[カウンター] = 0
        deleteCheckProgressArray = [FIELD_WIDTH * FIELD_HEIGHT]
    }
    operatingPuyoArray = [2]
    for (let カウンター = 0; カウンター <= 1; カウンター++) {
        operatingPuyoArray[カウンター] = 0
    }
    nextPuyoArray = [2]
    for (let カウンター = 0; カウンター <= 1; カウンター++) {
        nextPuyoArray[カウンター] = randint(1, 4)
    }
    next2PuyoArray = [2]
    for (let カウンター = 0; カウンター <= 1; カウンター++) {
        next2PuyoArray[カウンター] = randint(1, 4)
    }
    deleteColorArray = [5]
    for (let カウンター = 0; カウンター <= 3; カウンター++) {
        deleteColorArray[カウンター] = 0
    }
    scene.setBackgroundColor(3)
    fieldFrameImage = image.create(FIELD_WIDTH * FIELD_CELLSIZE + 2, (FIELD_HEIGHT - 2) * FIELD_CELLSIZE + 2)
    fieldFrameImage.drawRect(0, 0, FIELD_WIDTH * FIELD_CELLSIZE + 2, (FIELD_HEIGHT - 2) * FIELD_CELLSIZE + 2, 15)
    fieldFrameSprite = sprites.create(fieldFrameImage, SpriteKind.UI)
    fieldFrameSprite.setPosition(FIELD_POS_X + FIELD_WIDTH * FIELD_CELLSIZE / 2, FIELD_POS_Y + (FIELD_HEIGHT - 2) * FIELD_CELLSIZE / 2)
}
function PushNextPuyo () {
    for (let カウンター = 0; カウンター <= 1; カウンター++) {
        operatingPuyoArray[カウンター] = nextPuyoArray[カウンター]
    }
    for (let カウンター = 0; カウンター <= 1; カウンター++) {
        nextPuyoArray[カウンター] = next2PuyoArray[カウンター]
    }
    for (let カウンター = 0; カウンター <= 1; カウンター++) {
        next2PuyoArray[カウンター] = randint(1, 4)
    }
    operatingPuyoPosX = 2
    operatingPuyoPosY = 2
    leftRotateIntervalTimer = 0
    rightRotateIntervalTimer = 0
    leftMoveIntervalTimer = 0
    rightMoveIntervalTimer = 0
    downMoveIntervalTimer = 0
    operatingPuyoFallTimer = 0
    operatingPuyoDirection = 0
    operatingPuyo2PosX = 0
    operatingPuyo2PosY = -1
    state = 1
}
function FallCheck (index: number) {
    if (Math.floor(index / FIELD_WIDTH) + 1 >= FIELD_HEIGHT) {
        return false
    }
    if (fieldArray[index + FIELD_WIDTH] == 0) {
        return true
    } else {
        return false
    }
}
let fieldFrameSprite: Sprite = null
let fieldFrameImage: Image = null
let startTimer = 0
let fallStartPuyoTimer = 0
let deletePuyoTimer = 0
let putPuyoTimer = 0
let isRotatingRightMiddle = false
let rightRotateIntervalTimer = 0
let isRotatingLeftMiddle = false
let leftRotateIntervalTimer = 0
let leftMoveIntervalTimer = 0
let operatingPuyoFallTimer = 0
let downMoveIntervalTimer = 0
let rightMoveIntervalTimer = 0
let operatingPuyoSprite2: Sprite = null
let operatingPuyoSprite1: Sprite = null
let operatingPuyo2PosX = 0
let operatingPuyo2PosY = 0
let predictionSprite2: Sprite = null
let operatingPuyoArray: number[] = []
let predictionSprite1: Sprite = null
let state = 0
let next2PuyoArray: number[] = []
let nextPuyoArray: number[] = []
let mySprite: Sprite = null
let connectedCount = 0
let isDeleteCheckingArray: number[] = []
let tmp = 0
let deleteCount = 0
let score = 0
let maxConnectedCount = 0
let deleteColorArray: number[] = []
let deleteColorCount = 0
let chainCount = 0
let spaceCountOnDeleteCheck = 0
let isDelete = false
let deleteCheckProgressArray: number[] = []
let fieldArray: number[] = []
let isDeleteArray: number[] = []
let operatingPuyoDirection = 0
let DELETE_COLOR_COUNT_FACTOR_ARRAY: number[] = []
let CONNECTED_COUNT_FACTOR_ARRAY: number[] = []
let CHAIN_FACTOR_ARRAY: number[] = []
let FIELD_POS_Y = 0
let FIELD_POS_X = 0
let operatingPuyoPosY = 0
let operatingPuyoPosX = 0
let FALL_START_PUYO_TIME = 0
let DELETE_PUYO_TIME = 0
let PUT_PUYO_TIME = 0
let DOWN_MOVE_INTERVAL = 0
let RIGHT_MOVE_INTERVAL = 0
let LEFT_MOVE_INTERVAL = 0
let RIGHT_ROTATE_INTERVAL = 0
let LEFT_ROTATE_INTERVAL = 0
let NEXT2_PUYO_POS_Y = 0
let NEXT2_PUYO_POS_X = 0
let NEXT_PUYO_POS_Y = 0
let NEXT_PUYO_POS_X = 0
let FPS = 0
let OPERATING_PUYO_FALL_TIME = 0
let START_TIME = 0
let FIELD_CELLSIZE = 0
let FIELD_HEIGHT = 0
let FIELD_WIDTH = 0
InitConstVariable()
Initialize()
Paint()
/**
 * Paintが重い
 */
game.onUpdateInterval(1000 / FPS, function () {
    if (state == 0) {
        startTimer += FPS
        if (START_TIME <= startTimer) {
            PushNextPuyo()
            state = 1
            startTimer = 0
        }
    } else if (state == 1) {
        if (controller.A.isPressed()) {
            RotatePuyo(1)
        }
        if (controller.B.isPressed()) {
            RotatePuyo(0)
        }
        if (controller.right.isPressed()) {
            MovePuyo(1)
        }
        if (controller.left.isPressed()) {
            MovePuyo(3)
        }
        if (!(controller.right.isPressed() || controller.left.isPressed())) {
            if (controller.down.isPressed()) {
                MovePuyo(2)
            }
        }
        if (operatingPuyoFallTimer > OPERATING_PUYO_FALL_TIME) {
            MovePuyo(2)
        }
        operatingPuyoFallTimer += 1000 / FPS
        leftRotateIntervalTimer += 1000 / FPS
        rightRotateIntervalTimer += 1000 / FPS
        rightMoveIntervalTimer += 1000 / FPS
        leftMoveIntervalTimer += 1000 / FPS
        downMoveIntervalTimer += 1000 / FPS
    } else if (state == 2) {
        putPuyoTimer += FPS
        if (PUT_PUYO_TIME < putPuyoTimer) {
            DeleteCheck()
            if (isDelete) {
                state = 3
            } else {
                if (DefeatCheck()) {
                    state = 5
                } else {
                    chainCount = 0
                    state = 1
                    PushNextPuyo()
                }
            }
            putPuyoTimer = 0
        }
    } else if (state == 3) {
        deletePuyoTimer += FPS
        if (DELETE_PUYO_TIME < deletePuyoTimer) {
            DeletePuyo()
            state = 4
            deletePuyoTimer = 0
        }
    } else if (state == 4) {
        fallStartPuyoTimer += FPS
        if (FALL_START_PUYO_TIME < fallStartPuyoTimer) {
            FallFieldPuyoAll()
            state = 2
            fallStartPuyoTimer = 0
        }
    } else {
        game.showLongText("ばたんきゅー\\n" + "スコア：" + convertToText(info.score()), DialogLayout.Bottom)
        game.showLongText("Aボタンでリトライ", DialogLayout.Bottom)
        Initialize()
    }
    Paint()
})

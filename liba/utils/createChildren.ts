import {propsTheSame} from "./propsTheSame";
import {Liba, TComponentFunction, TComponentInstance} from "../Liba";

export function createChildren<
    CI extends TComponentInstance<any, any, any>,
    CF extends TComponentFunction<any, any, any>,
    P extends {}
>(
    componentInstance: CI,
    ChildrenComponentFunction: CF,
    props: P
): TComponentInstance<Partial<any>, any, {}>
{
    componentInstance.childrenIndex++

    const alreadyExistedComponentInstance = componentInstance.childrenComponents?.[componentInstance.childrenIndex]

    if (alreadyExistedComponentInstance) {
        if (alreadyExistedComponentInstance.type === ChildrenComponentFunction) {
            if (propsTheSame(props, alreadyExistedComponentInstance.props)) {
                return alreadyExistedComponentInstance
            } else {
                alreadyExistedComponentInstance.props = props
                alreadyExistedComponentInstance.renderLiba.refresh()
                return alreadyExistedComponentInstance
            }
        } else {
            delete componentInstance.childrenComponents?.[componentInstance.childrenIndex]
        }
    }

    return Liba.create(ChildrenComponentFunction, props, {parent: componentInstance})
}
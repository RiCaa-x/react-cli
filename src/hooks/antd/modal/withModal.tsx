import { UniversalModalRef } from '@/typings/antd';
import { useMemoizedFn, useSetState } from 'ahooks';
import { Modal, ModalProps } from 'antd';
import React, { forwardRef, memo, useImperativeHandle } from 'react';
import { ModalContext } from '.';

type WithModal = <PropsType, T extends React.ComponentType<any> = React.ComponentType<PropsType>>(
  Component: T,
  modalProps?: ModalProps
) => React.NamedExoticComponent<
  React.ComponentPropsWithRef<React.PropsWithRef<T>> & { ref?: React.Ref<UniversalModalRef> }
>;

const regularModalProps: ModalProps = {
  width: '90vw',
  footer: null,
  destroyOnClose: true,
  maskClosable: __ISDEV__,
  focusTriggerAfterClose: true
};

export const withModal: WithModal = (Component, modalProps) => {
  return memo(
    forwardRef<UniversalModalRef, any>((props, ref) => {
      const [state, setState] = useSetState<ModalProps>({ open: false, ...modalProps });

      const open = useMemoizedFn(() => setState({ open: true }));

      const close = useMemoizedFn(() => setState({ open: false }));

      useImperativeHandle(ref, () => ({ open, close }));

      return (
        <ModalContext.Provider value={{ props: state, setProps: setState,open,close }}>
          <Modal {...regularModalProps} open={state.open} onCancel={close} {...state}>
            {React.createElement(Component, props)}
          </Modal>
        </ModalContext.Provider>
      );
    })
  );
};

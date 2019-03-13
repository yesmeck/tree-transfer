import React, { useCallback } from 'react';
import { Tree } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import styles from './index.module.css';

const { TreeNode } = Tree;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TreeTransfer = ({ dataSource, onChange, selectedKeys }) => {
  const items = dataSource.reduce((acc, item) => {
    return acc.concat(item.children);
  }, []);
  const handleCheck = useCallback(
    (_, info) => {
      const { checkedNodes } = info;
      const checkedKeys = checkedNodes.filter(node => !node.props.children).map(node => node.key);
      const newKeys = [];
      let existKeys = [];
      checkedKeys.forEach(key => {
        if (!selectedKeys.includes(key)) {
          newKeys.push(key);
        } else {
          existKeys.push(key);
        }
      });
      existKeys = existKeys.sort((a, b) => selectedKeys.indexOf(a) - selectedKeys.indexOf(b));
      console.log(1);
      onChange([...newKeys, ...existKeys]);
    },
    [selectedKeys],
  );

  const hanelDragEnd = useCallback(
    result => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const next = reorder(selectedKeys, result.source.index, result.destination.index);

      console.log(2);
      onChange(next);
    },
    [selectedKeys],
  );

  return (
    <div className={styles.container}>
      <div className={styles.source}>
        <Tree checkable onCheck={handleCheck}>
          {dataSource.map(item => (
            <TreeNode title={item.name} key={item.name}>
              {item.children.map(child => (
                <TreeNode title={child.name} key={child.id} />
              ))}
            </TreeNode>
          ))}
        </Tree>
      </div>
      <div className={styles.target}>
        <DragDropContext onDragEnd={hanelDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
                {selectedKeys.map((key, index) => {
                  const item = items.find(i => i.id.toString() === key);
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={classnames(styles.item, { [styles.dragging]: snapshot.isDragging })}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TreeTransfer;

import { mount } from '@vue/test-utils';
import TasksTable from '../../../components/Tasks.vue'; // Adjust the import path as needed

describe('TasksTable.vue', () => {
  const tasks = [
    { _id: '1', task: 'Test Task 1', description: 'Description 1', createdAt: '2021-01-01' },
    { _id: '2', task: 'Test Task 2', description: 'Description 2', createdAt: '2021-01-02' }
  ];

  it('renders tasks correctly', () => {
    const wrapper = mount(TasksTable, {
      props: { tasks }
    });

    // Check if the component renders the correct number of task rows
    expect(wrapper.findAll('tr.tasks').length).toBe(tasks.length);

    // Check content of the first task
    const firstTaskFields = wrapper.findAll('tr.tasks')[0].findAll('td');
    expect(firstTaskFields[0].text()).toContain(tasks[0]._id);
    expect(firstTaskFields[1].text()).toContain(tasks[0].description);
    expect(firstTaskFields[2].text()).toContain(tasks[0].createdAt);
  });

  it('emits the editTask event when the Edit button is clicked', async () => {
    const wrapper = mount(TasksTable, {
      props: { tasks }
    });

    await wrapper.findAll('.btn-edit')[0].trigger('click');
    expect(wrapper.emitted()).toHaveProperty('editTask');
    const editTaskEvents = wrapper.emitted('editTask');
    // Ensure the event was emitted
    expect(editTaskEvents).toBeDefined();
    expect(editTaskEvents![0]).toEqual([tasks[0]]);
  });

  it('emits the deleteTask event when the Delete button is clicked', async () => {
    const wrapper = mount(TasksTable, {
      props: { tasks }
    });

    await wrapper.findAll('.btn-delete')[0].trigger('click');
    expect(wrapper.emitted()).toHaveProperty('deleteTask');
    const deleteTaskEvents = wrapper.emitted('deleteTask');
    // Ensure the event was emitted
    expect(deleteTaskEvents).toBeDefined();
    expect(deleteTaskEvents![0]).toEqual([tasks[0]]);
  });

  it('emits the detailTask event when a task row is clicked', async () => {
    const wrapper = mount(TasksTable, {
      props: { tasks }
    });

    // Assuming the entire row is clickable and triggers detailTask event
    await wrapper.findAll('th.task')[0].trigger('click');
    expect(wrapper.emitted()).toHaveProperty('detailTask');
    expect(wrapper.emitted('detailTask')![0]).toEqual([tasks[0]._id]);
  });
});

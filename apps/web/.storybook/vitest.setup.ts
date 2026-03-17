import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/experimental-nextjs-vite';
import * as projectAnnotations from './preview';

const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
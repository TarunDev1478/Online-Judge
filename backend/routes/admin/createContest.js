import express from 'express';
import cors from 'cors';
import { Admin, Problem } from '../../db/db.js';
import {authenticateAdminJwt } from '../../middleware/authentication.js';
import z from 'zod';

